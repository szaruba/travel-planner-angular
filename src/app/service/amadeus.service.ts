import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, tap, map, of, filter } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';
import * as citySearchJson from 'src/assets/api-cache/city-search.json';
import { Hotel } from 'src/app/model/hotel.model';

const API_BASE = 'https://test.api.amadeus.com/';

@Injectable({
  providedIn: 'root',
})
export class AmadeusService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  public citySearch(keyword: string): Observable<AmadeusLocation[]> {
    return this.http
      .get<AmadeusResponse<AmadeusLocation[]>>(`${API_BASE}/v1/reference-data/locations/cities?keyword=${keyword}`, {
        headers: { Authorization: `Bearer ${this.tokenService.token}` },
      })
      .pipe(
        map(response => response.data),
        tap(locations => console.log(`${API_BASE}/v1/reference-data/locations/cities`, locations))
      );
    // return this.http
    //   .get<AmadeusLocation[]>('/assets/api-cache/city-search.json')
    //   .pipe(
    //     map(locations => locations.filter(location => location.name.toLowerCase().includes(keyword.toLowerCase())))
    //   );
  }

  public hotelList(iataCode: string, radiusKm: number = 5): Observable<Hotel[]> {
    return this.http
      .get<AmadeusResponse<Hotel[]>>(
        `${API_BASE}/v1/reference-data/locations/hotels/by-city?cityCode=${iataCode}&radius=${radiusKm}`,
        {
          headers: { Authorization: `Bearer ${this.tokenService.token}` },
        }
      )
      .pipe(map(response => response.data));
    // return this.http.get<any>(`/assets/api-cache/hotel-list-malaga-r100.json`).pipe(tap(console.log));
  }

  public hotelOffers(hotelId: string, checkInDate: string, checkOutDate: string): Observable<AmadeusHotelOffers> {
    return this.http
      .get<AmadeusResponse<AmadeusHotelOffers[]>>(
        `${API_BASE}v3/shopping/hotel-offers?hotelIds=${hotelId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&lang=EN&includeClosed=true&bestRateOnly=false&adults=1`,
        {
          headers: { Authorization: `Bearer ${this.tokenService.token}` },
        }
      )
      .pipe(
        tap(response =>
          console.log(
            `${API_BASE}v3/shopping/hotel-offers?hotelIds=${hotelId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
            response
          )
        ),
        map(response => response.data[0])
      );
  }
}

export interface AmadeusResponse<T> {
  data: T;
  meta: any;
}

export interface AmadeusLocation {
  type: string;
  subtype: string;
  name: string;
  iataCode: string;
  address: { countryCode: string };
}

export interface AmadeusHotelOffers {
  type: string;
  hotel: Hotel;
  available: boolean;
  offers: [
    {
      id: string;
      checkInDate: string;
      checkOutDate: string;
      rateCode: string;
      boardType: string;
      rateFamilyEstimated: {
        code: string;
        type: string;
      };
      room: {
        type: string;
        typeEstimated: {
          category: string;
          beds: number;
          bedType: string;
        };
        description: {
          text: string;
          lang: string;
        };
      };
      price: {
        currency: string;
        base: string;
        total: string;
      };
    },
  ];
}
