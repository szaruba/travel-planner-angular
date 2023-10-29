export interface Hotel {
  hotelId: string;
  iataCode: string;
  name: string;
  address: { countryCode: string };

  distance: {
    value: number;
    unit: string;
  };
  geoCode: {
    latitude: number;
    longitude: number;
  };

  // from google Places
  referenceImg: string;
  images: string[];
  formattedAddress: string;
  googleMapsUri: string;
  websiteUri: string;
}
