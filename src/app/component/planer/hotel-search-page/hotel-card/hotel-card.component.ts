import { Component, Input } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';
import { API_KEY, GooglePlacesService } from 'src/app/service/google-places.service';
import { PlanerStateService } from 'src/app/service/planer-state.service';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent {
  @Input()
  public hotel: Hotel;

  constructor(
    private googleApi: GooglePlacesService,
    public stateService: PlanerStateService
  ) {}

  loadMoreInfo() {
    this.googleApi.enrichHotelInfo(this.hotel).subscribe(hotel => {
      this.hotel.images = hotel.images;
      this.hotel.referenceImg = hotel.referenceImg;
      this.hotel.formattedAddress = hotel.formattedAddress;
      this.hotel.name = hotel.name;
      this.hotel.googleMapsUri = hotel.googleMapsUri;
      this.hotel.websiteUri = hotel.websiteUri;
    });
  }

  getImageSource() {
    if (this.hotel.referenceImg) {
      return `https://places.googleapis.com/v1/${this.hotel.referenceImg}/media?key=${API_KEY}&max_width_px=320`;
    } else {
      return 'assets/hotel-placeholder.png';
    }
  }

  isSelected(): boolean {
    return this.hotel.hotelId === this.stateService.state.selectedHotel?.hotelId;
  }

  selectHotel() {
    this.stateService.state.selectedHotel = this.hotel;
    this.stateService.changed$.next(this.hotel);
  }
}
