import { ViewChild, OnInit, Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable} from 'rxjs';
@Component({
  selector: 'app-bike',
  styleUrls: ['./bike.component.scss'],
  template: `
  <table>
    <tr *ngFor="let col of displayedColumns">
      <th>{{col}}</th>
    </tr>
    <tr *ngFor="let data of datas();">
      <td>{{data}}</td>
    </tr>
  </table>
  `
})

export class BikeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'maker', 'weight', 'class']
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  datas() {
    let keys = Object.keys(this.dataSource.data[0])
    let arr = [];
    for (let d of this.dataSource.data) {
      arr.push(d[keys[0]]);
      arr.push(d[keys[1]]);
      arr.push(d[keys[2]]);
      arr.push(d[keys[3]]);
    }
    return arr;
  }
}
export interface PeriodicElement {
  name: string;
  maker: string;
  weight: number;
  class: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'GSX250R', maker: 'SUZUKI', weight: 134, class: 250},
  { name: 'gixxer', maker: 'SUZUKI', weight: 134, class: 150 },
  { name: 'gixxer sf 250', maker: 'SUZUKI', weight: 184, class: 250 },
  { name: 'R25', maker: 'YAMAHA', weight: 184, class: 250 },
];