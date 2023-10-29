import { Component } from '@angular/core';
import { AmadeusLocation, AmadeusService } from 'src/app/service/amadeus.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime, Observable, startWith, switchMap } from 'rxjs';
import { Hotel } from 'src/app/model/hotel.model';
import { PlanerStateService } from 'src/app/service/planer-state.service';

@Component({
  selector: 'app-hotel-search-page',
  templateUrl: './hotel-search-page.component.html',
  styleUrls: ['./hotel-search-page.component.scss'],
})
export class HotelSearchPageComponent {
  public filteredLocations$: Observable<AmadeusLocation[]>;
  public filterForm;
  public hotels$ = new BehaviorSubject<Hotel[]>([]);

  constructor(
    private amadeusService: AmadeusService,
    fb: FormBuilder,
    public stateService: PlanerStateService
  ) {
    this.filterForm = fb.group({
      location: new FormControl<string | AmadeusLocation>(''),
      tripTypeFriendly: false,
    });
  }

  ngOnInit() {
    this.filteredLocations$ = this.filterForm.get('location')!.valueChanges.pipe(
      debounceTime(500),
      switchMap(location => {
        const locationName = this.getLocationName(location ?? '');
        return this.amadeusService.citySearch(locationName);
      })
    );
    this.amadeusService.hotelList('', 100).subscribe(hotels => this.hotels$.next(hotels));
  }

  public search(): void {
    const location = this.filterForm.value.location;

    if (location && typeof location === 'object') {
      this.amadeusService.hotelList(location.iataCode, 100).subscribe(hotels => this.hotels$.next(hotels));
    }
  }

  private getLocationName(location: string | AmadeusLocation): string {
    return typeof location === 'string' ? location : location.name;
  }

  public displayLocationLabel(location: AmadeusLocation): string {
    return location.name + ' (' + location.address.countryCode + ')';
  }

  public log(val: any) {
    console.log(val);
  }
}

export interface FilterForm {
  location: FormControl<string>;
  tripTypeFriendly: FormControl<boolean>;
}
