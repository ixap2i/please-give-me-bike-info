import { ViewChild, OnInit } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElemnt {
  name: string;
  maker: string;
  weight: number;
  class: number;
}

const ELEMENT_DATA: PeriodicElemnt[] = [
  { name: 'GSX250R', maker: 'SUZUKI', weight: 134, class: 250},
  { name: 'gixxer', maker: 'SUZUKI', weight: 134, class: 150 },
  { name: 'gixxer sf 250', maker: 'SUZUKI', weight: 184, class: 250 },
  { name: 'R25', maker: 'YAMAHA', weight: 184, class: 250 },
]

export class BikeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'maker', 'weight', 'class']
  dataSource = ELEMENT_DATA;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

    // this.dataSource.paginator = this.paginator;
  }
}
