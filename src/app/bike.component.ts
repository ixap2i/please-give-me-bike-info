import { ViewChild, OnInit, Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BikeDataService } from './bike-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-bike',
  styleUrls: ['./bike.component.scss'],
  template: `
  <table>
    <tr *ngFor="let col of displayedColumns">
      <th>{{col}}</th>
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

  constructor(private http: HttpClient, private datas: BikeDataService) {}

  ngOnInit() {
    this.datas = Object.assign(new BikeDataService, ELEMENT_DATA);
    console.log(this.datas);
  }

  dataToBikesArray(datas: any): any {
    let keys = Object.keys(this.dataSource)
    let arr = [];
    arr.push(datas[keys[0]]);
    arr.push(datas[keys[1]]);
    arr.push(datas[keys[2]]);
    arr.push(datas[keys[3]]);
    return datas;
  }

  getReq(): any {
    this.http.get('http://localhost:4201/bikes', this.httpOptions).toPromise().then((d) => {
      var bike_datas = [];
      // var bike_datas = Object.assign(new BikeDataService, d);
      return bike_datas;
    });
  }
}

export interface PeriodicElement {
  name: string;
  maker: string;
  weight: number;
  class: number;
}
const ELEMENT_DATA = [
  { name: 'GSX250R', maker: 'SUZUKI', weight: 134, class: 250},
  { name: 'gixxer', maker: 'SUZUKI', weight: 134, class: 150 },
  { name: 'gixxer sf 250', maker: 'SUZUKI', weight: 184, class: 250 },
  { name: 'R25', maker: 'YAMAHA', weight: 184, class: 250 },
];