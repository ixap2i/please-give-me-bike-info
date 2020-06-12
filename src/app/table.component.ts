import { Component, NgModule, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@NgModule({
  imports: [
    MatPaginator, MatTableDataSource
  ],
  providers: [],
  bootstrap: []
})

@Component({
  selector: 'app-bike',
  templateUrl: './table.component.pug',
  styleUrls: ['./app.component.scss']
})

export class BikeComponent {

}