import { Injectable } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanerStateService {
  public state: PlanerState = {};
  public changed$: Subject<any> = new Subject<any>();

  constructor() {
    this.load();
  }

  public store() {
    console.log('storing planerState', this.state);
    localStorage.setItem('planerState', JSON.stringify(this.state));
  }

  public load() {
    const storedState = localStorage.getItem('planerState');
    console.log('loading planerState', storedState);
    if (storedState) {
      this.state = JSON.parse(storedState);
    }
  }

  public triggerChange() {
    this.changed$.next(null);
  }
}

interface PlanerState {
  tripType?: string;
  selectedHotel?: Hotel;
  selectedStep?: number;
  checkInDate?: any;
  checkOutDate?: any;
  tripDestination?: any;
}
