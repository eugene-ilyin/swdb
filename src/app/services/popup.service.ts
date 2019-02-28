import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material";
import {DialogInfoComponent} from "../components/dialog-info/dialog-info.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(public dialog: MatDialog) { }

  openDialog(entity: any[]) {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      data: {
        entity,
      }
    });
  }
}
