import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import {OverlayContainer} from '@angular/cdk/overlay';
import { FormControl, FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// ますとらしい
import { HammerModule } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'please-give-me-bike-info';


  filteredOptions: Observable<string[]>;

  matAutocomplete = new MatAutocompleteModule();
  formControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  constructor(overlayContainer: OverlayContainer, private _fg: FormBuilder) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
