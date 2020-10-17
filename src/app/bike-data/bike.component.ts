import { ViewChild, OnInit, Component } from '@angular/core';
import { BikeBaseService } from '../bike-base.service';
import { TABLE_COLUMNS } from '../bike-base.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'bike-data',
  styleUrls: ['./bike.component.scss'],
  template: `
  <div class="p-bike">
    <div class="a-title__engine" id="50cc">50cc</div>
    <div class="m-bike">
      <table class="a-table">
        <tr>
          <th *ngFor="let col of TABLE_COLUMNS">{{col}}</th>
        </tr>
        <ng-container>
          <tr *ngFor="let d of dataSource_50">
            <td><img src="{{d.imgUrl}}" /></td>
            <td>{{d.name}}</td>
            <td>{{d.model_number ? d.model_number : '-'}}</td>
            <td>{{d.status}}</td>
            <td>{{d.color}}</td>
            <td>{{d.distance}}</td>
            <td>{{d.place}}</td>
            <td>{{d.price}}</td>
          </tr>
        </ng-container>
      </table>
    </div>
    <div class="a-title__engine" id="250cc">250cc</div>
    <div class="m-bike">
      <table class="a-table">
        <tr>
          <th *ngFor="let col of TABLE_COLUMNS">{{col}}</th>
        </tr>
        <ng-container *ngFor="let d of dataSource_250">
          <tr>
            <td><img src="{{d.imgUrl}}" /></td>
            <td>{{d.name}}</td>
            <td>{{d.model_number ? d.model_number : '-'}}</td>
            <td>{{d.status}}</td>
            <td>{{d.color}}</td>
            <td>{{d.distance}}</td>
            <td>{{d.place}}</td>
            <td>{{d.price}}</td>
          </tr>
        </ng-container>
      </table>
    </div>
    <div class="a-title__engine" id="400cc">400cc</div>
    <div class="m-bike">
      <table class="a-table">
        <tr>
          <th *ngFor="let col of TABLE_COLUMNS">{{col}}</th>
        </tr>
        <ng-container *ngFor="let d of dataSource_400">
          <tr>
            <td><img src="{{d.imgUrl}}" /></td>
            <td>{{d.name}}</td>
            <td>{{d.model_number ? d.model_number : '-'}}</td>
            <td>{{d.status}}</td>
            <td>{{d.color}}</td>
            <td>{{d.distance}}</td>
            <td>{{d.place}}</td>
            <td>{{d.price}}</td>
          </tr>
        </ng-container>
      </table>
    </div>
  <div>
  `
})

export class BikeComponent implements OnInit {
  dataSource_50: any = [];
  dataSource_250: any = [];
  dataSource_400: any = [];
  TABLE_COLUMNS: string[] = TABLE_COLUMNS;

  constructor(private http: HttpClient, private route: ActivatedRoute, public bikeBaseService: BikeBaseService) {
    this.get50ccsBikeNames();
    this.get250ccsBikeNames();
    this.get400ccsBikeNames();
  }

  setBikeData(dataJson: string) {
    this.bikeBaseService.setName(dataJson['name']);
    this.bikeBaseService.setStatus(dataJson['status']);
    this.bikeBaseService.setColor(dataJson['color']);
    this.bikeBaseService.setDistance(dataJson['distance']);
    this.bikeBaseService.setPlace(dataJson['place']);
    this.bikeBaseService.setPrice(dataJson['price']);
    this.bikeBaseService.setImage(dataJson['imgUrl']);
  }

  ngOnInit() {
  }

  get50ccsBikeNames() {
    return this.http.get<BikeBaseService[]>('http://3.128.61.205:4201/goo_bikes_50').toPromise().then(res => {
      if(res instanceof HttpErrorResponse) {
        return console.log(res)
      }
      var bikeServices_50 = [];

      res.some(function(el) {
        bikeServices_50.push(JSON.parse(el.toString()));
      });
      this.dataSource_50 = bikeServices_50;
    });
  }

  get250ccsBikeNames() {
    return this.http.get<BikeBaseService[]>('http://3.128.61.205:4201/goo_bikes_250').toPromise().then(res => {
      if(res instanceof HttpErrorResponse) {
        return console.log(res)
      }
      var bikeServices_250 = [];

      res.some(function(el) {
        bikeServices_250.push(JSON.parse(el.toString()));
      });
      this.dataSource_250 = bikeServices_250;
    });
  }

  get400ccsBikeNames() {
    return this.http.get<BikeBaseService[]>('http://3.128.61.205:4201/goo_bikes_400').toPromise().then(res => {
      if(res instanceof HttpErrorResponse) {
        return console.log(res)
      }
      var bikeServices_400 = [];

      res.some(function(el) {
        bikeServices_400.push(JSON.parse(el.toString()));
      });
      this.dataSource_400 = bikeServices_400;
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
