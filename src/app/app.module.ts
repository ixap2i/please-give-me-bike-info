import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BikeModule } from './bike.module';

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
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import {OverlayContainer} from '@angular/cdk/overlay';
import { FormControl, FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BikeComponent } from './bike.component'

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
    BikeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent, BikeComponent
  ],
  providers: [],
  bootstrap: [AppComponent, BikeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  filteredOptions: Observable<string[]>;

  formControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  constructor(overlayContainer: OverlayContainer, private _fg: FormBuilder) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }

  ngOnInit() {

    // this.filteredOptions = this.formControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
