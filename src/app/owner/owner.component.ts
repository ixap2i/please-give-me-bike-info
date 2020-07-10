import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'owner-component',
  styleUrls: ['./owner.component.scss'],
  templateUrl: './owner.component.pug',
})

export class OwnerComponent {
  constructor(public ownerDialog: MatDialog) {}
  // openDialog(): void {
  //   const dialogRef = this.ownerDialog.open(OwnerComponentDialog, {
  //     width: '300px',
  //     data: 'test'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //   });
  // }
}


