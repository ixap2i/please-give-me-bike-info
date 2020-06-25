import { ViewChild, OnInit, Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BikeDataService } from './bike-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-bike',
  styleUrls: ['./bike.component.scss'],
  template: `
  <table>
    <tr>
      <th *ngFor="let col of displayedColumns">{{col}}</th>
    </tr>
    <tr *ngFor="let d of dataSource">
      <td>{{d['name']}}</td>
      <td>{{d['maker']}}</td>
      <td>{{d['weight']}}</td>
      <td>{{d['bclass']}}</td>
    </tr>
  </table>
  `
})

export class BikeComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['name', 'maker', 'weight', 'class']
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getReq();
    console.log(this.dataSource[0]);
  }


  getReq() {
    return this.http.get<BikeDataService[]>('http://localhost:4201/bikes').toPromise().then(res => this.dataSource = res);
  }
}

export interface PeriodicElement {
  name: string;
  maker: string;
  weight: number;
  class: number;
}
const ELEMENT_DATA = [
  { name: 'GSX250R', maker: 'SUZUKI', weight: 134, bclass: 250},
  { name: 'gixxer', maker: 'SUZUKI', weight: 134, bclass: 150 },
  { name: 'gixxer sf 250', maker: 'SUZUKI', weight: 184, bclass: 250 },
  { name: 'R25', maker: 'YAMAHA', weight: 184, bclass: 250 },
];
