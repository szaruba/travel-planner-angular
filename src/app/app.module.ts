import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { PlanerComponent } from './component/planer/planer.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { TypePageComponent } from './component/planer/type-page/type-page.component';
import { TypeCardComponent } from './component/planer/type-page/type-card/type-card.component';
import { HotelSearchPageComponent } from './component/planer/hotel-search-page/hotel-search-page.component';
import { ActivitiesPageComponent } from './component/planer/activities-page/activities-page.component';
import { DescriptionPageComponent } from './component/planer/description-page/description-page.component';
import { PricePageComponent } from './component/planer/price-page/price-page.component';
import { RoomPageComponent } from './component/planer/room-page/room-page.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { HotelCardComponent } from './component/planer/hotel-search-page/hotel-card/hotel-card.component';
import { NgOptimizedImage } from '@angular/common';
import { ButtonDirective, CarouselComponent, CarouselModule } from '@coreui/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlanerComponent,
    HomeComponent,
    TypePageComponent,
    TypeCardComponent,
    HotelSearchPageComponent,
    ActivitiesPageComponent,
    DescriptionPageComponent,
    PricePageComponent,
    RoomPageComponent,
    HotelCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    NgOptimizedImage,
    CarouselModule,
    ButtonDirective,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
