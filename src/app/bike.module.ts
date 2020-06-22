import { OnInit, ViewChild, NgModule } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [  ],
  imports:      [ ],
  providers: [],
  bootstrap: [MatPaginator, MatTableModule, MatPaginatorModule, MatTableDataSource],
})

export class BikeModule {
}
