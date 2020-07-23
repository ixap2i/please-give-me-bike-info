import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormControl, FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// ますとらしい
import { HammerModule } from '@angular/platform-browser'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('hover-cursor', [
      state('mouse-enter', style({
        opacity: 1,
        backgroundColor: '#000',
        color: '#fff'
      })),
      state('mouse-out', style({
        opacity: 1,
        backgroundColor: 'rgba(196, 196, 196, 0.28)'
      })),
      transition('mouse-enter => mouse-out',[
        animate('1s')
      ]),
      transition('mouse-out => mouse-enter',[
        animate('1s')
      ])
    ])
  ]
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
