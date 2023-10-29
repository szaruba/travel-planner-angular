import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval } from 'rxjs';

const API_BASE = 'https://test.api.amadeus.com/';
const API_KEY = '';
const API_SECRET = '';
const DUMMY_TOKEN: AmadeusToken = { access_token: '', created_at: 0, expires_in: 1 };
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token$ = new BehaviorSubject<AmadeusToken>(DUMMY_TOKEN);

  constructor(private http: HttpClient) {
    this.loadToken();

    if (this.hasExpired(this.token$.value)) {
      this.renewAuthToken();
    } else {
      setTimeout(() => this.renewAuthToken(), this.expiresInSeconds(this.token$.value) * 1000 - 100 * 1000);
    }
    this.token$.subscribe(token =>
      console.log('token$ next', token, 'expires in seconds', this.expiresInSeconds(token))
    );
  }

  private renewAuthToken(): void {
    console.log('requesting new token from Amadeus API');
    this.http
      .post<AmadeusToken>(
        `${API_BASE}/v1/security/oauth2/token`,
        `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      .subscribe(token => {
        console.log('received new token from Amadeus API', token);
        this.token$.next(token);
        this.storeToken(token);
        setTimeout(() => this.renewAuthToken(), token.expires_in * 1000 - 100 * 1000);
      });
  }

  private storeToken(token: AmadeusToken): void {
    token.created_at = new Date().getTime();
    localStorage.setItem('amadeus_token', JSON.stringify(token));
    console.log('stored token to localStorage', token);
  }

  private loadToken(): void {
    console.log('Loading token from localStorage');

    const stringifiedToken = localStorage.getItem('amadeus_token');

    if (stringifiedToken) {
      this.token$.next(JSON.parse(stringifiedToken));
    }
  }

  private hasExpired(token: AmadeusToken): boolean {
    return (new Date().getTime() - token.created_at) / 1000 > token.expires_in - 100;
  }

  private expiresInSeconds(token: AmadeusToken): number {
    return token.expires_in - (new Date().getTime() - token.created_at) / 1000;
  }

  public get token(): string {
    return this.token$.value.access_token;
  }
}

export interface AmadeusToken {
  access_token: string;
  expires_in: number;
  created_at: number;
}
