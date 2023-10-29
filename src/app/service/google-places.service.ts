import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from 'src/app/model/hotel.model';
import { map, Observable, tap } from 'rxjs';

export const API_KEY = '';

@Injectable({
  providedIn: 'root',
})
export class GooglePlacesService {
  constructor(private http: HttpClient) {}

  public enrichHotelInfo(hotel: Hotel): Observable<Hotel> {
    return this.placesSearchText(hotel).pipe(
      map(response => {
        const place = response.places[0];
        if (place) {
          return {
            name: place.displayName.text,
            formattedAddress: place.formattedAddress,
            referenceImg: place.photos[0].name,
            images: place.photos.map(photo => photo.name),
            googleMapsUri: place.googleMapsUri,
            websiteUri: place.websiteUri,
          } as Hotel;
        }
        return {} as Hotel;
      })
    );
  }

  public placesSearchText(hotel: Hotel): Observable<PlacesSearchResponse> {
    return this.http
      .post<PlacesSearchResponse>(
        'https://places.googleapis.com/v1/places:searchText',
        {
          textQuery: hotel.name,
          locationBias: {
            circle: {
              center: {
                latitude: hotel.geoCode.latitude,
                longitude: hotel.geoCode.longitude,
              },
              radius: 500.0,
            },
          },
          maxResultCount: 5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask':
              'places.displayName,places.formattedAddress,places.googleMapsUri,places.types,places.photos,places.location,places.websiteUri',
          },
        }
      )
      .pipe(tap(response => console.log(response)));
  }
}

export interface PlacesSearchResponse {
  places: [
    {
      displayName: { text: string; languageCode: string };
      formattedAddress: string;
      googleMapsUri: string;
      websiteUri: string;
      photos: [
        {
          widthPx: number;
          heightPx: number;
          name: string;
        },
      ];
    },
  ];
}
