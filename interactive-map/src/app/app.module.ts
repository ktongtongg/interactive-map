import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider'
import { MatRadioModule } from '@angular/material/radio'
import { FormsModule } from '@angular/forms';
import { TaxiHttpService } from './services/taxi-http.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  providers: [
    TaxiHttpService
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    LeafletModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatRadioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
