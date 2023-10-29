import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlanerStateService } from 'src/app/service/planer-state.service';
import { API_KEY } from 'src/app/service/google-places.service';
import { AmadeusHotelOffers, AmadeusService } from 'src/app/service/amadeus.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.scss'],
})
export class RoomPageComponent implements OnInit {
  @ViewChild(MatTable) offersTable: MatTable<any>;

  slides: any[] | undefined = new Array(3).fill({
    id: -1,
    src: 'assets/hotel-placeholder.png',
    title: '',
    subtitle: '',
  });
  tripDateRange = new FormGroup({
    checkInDate: new FormControl<Date | undefined>(this.stateService.state.checkInDate),
    checkOutDate: new FormControl<Date | undefined>(this.stateService.state.checkOutDate),
  });
  @Input()
  public offers: AmadeusHotelOffers;
  showCarousel = false;

  constructor(
    public stateService: PlanerStateService,
    private amadeusService: AmadeusService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refresh();
    this.stateService.changed$.subscribe(() => this.refresh());
  }

  public refresh(): void {
    this.showCarousel = false;
    this.slides = this.stateService.state.selectedHotel?.images.map(image => ({
      id: Math.floor(Math.random() * 100000),
      src: `https://places.googleapis.com/v1/${image}/media?key=${API_KEY}&max_width_px=1024`,
      title: '',
      subtitle: '',
    }));
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    this.showCarousel = true;
  }

  public loadOffers(): void {
    const hotel = this.stateService.state.selectedHotel!;

    const checkIn = this.formatDateToYYYYMMDD(this.tripDateRange.value.checkInDate!);
    const checkOut = this.formatDateToYYYYMMDD(this.tripDateRange.value.checkOutDate!);
    this.amadeusService.hotelOffers(hotel.hotelId, checkIn, checkOut).subscribe(offers => {
      this.offers = offers;
      this.offersTable.renderRows();
    });
  }

  formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  print(x: any) {
    console.log(x);
  }
}
