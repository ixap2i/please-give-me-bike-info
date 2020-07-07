import { ViewChild, OnInit, Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BikeBaseService } from './bike-base.service';
import { BikeDetailService } from './bike-detail.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-bike',
  styleUrls: ['./bike.component.scss'],
  template: `
  <table>
    <tr>
      <th *ngFor="let col of displayedColumns">{{col}}</th>
    </tr>
    <tr *ngFor="let d of dataSource">
      <td>{{d}}</td>
    </tr>
  </table>
  `
})
// <td><a routerLink="/request_bikes/{{d[1]}}">{{d}}</a></td>

export class BikeComponent implements OnInit {
  // dataSource = ELEMENT_DATA;
  // dataSource: any = {};
  dataSource: any = [];
  displayedColumns: string[] = ['モデル', '年式', '色', '走行距離', 'エンジン', '修理歴', '販売店', '値段'];
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: null
  };

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) {
    this.get50ccsBikeNames();
  }

  ngOnInit() {
    // console.log(this.dataSource[0]);
    this.request_bikes();
  }


  getReq() {
    return this.http.get<BikeDetailService[]>('http://localhost:4201/bikes').toPromise().then(res => {
      if(res instanceof HttpErrorResponse) {
        return console.log(res)
      }
      this.dataSource = res;
    });
  }

  get50ccsBikeNames() {
    return this.http.get<BikeBaseService[]>('http://localhost:4201/goo_bikes').toPromise().then(res => {
      if(res instanceof HttpErrorResponse) {
        return console.log(res)
      }
      this.dataSource = res;
    });
  }

  request_bikes(): void {
    var id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
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
