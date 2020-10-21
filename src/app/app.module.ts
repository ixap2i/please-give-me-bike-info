import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BikeMenuComponent } from './bike-engine-menu/bike.menu.component'
import { BikeComponent } from './bike-data/bike.component'
import { OwnerComponent } from './owner/owner.component'
import { CreditMenuComponent } from './credit-menu/credit-menu.component'
import { HttpClientModule } from '@angular/common/http';

// ますとらしい
import { HammerModule } from '@angular/platform-browser'
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    HammerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent, BikeMenuComponent, BikeComponent, CreditMenuComponent, OwnerComponent
  ],
  providers: [],
  bootstrap: [AppComponent, BikeMenuComponent, BikeComponent, CreditMenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
}
