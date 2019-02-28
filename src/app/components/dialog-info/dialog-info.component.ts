import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {TableDataConfig} from "../../interfaces/table.interface";

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
})
export class DialogInfoComponent implements OnInit {

  entityInfo = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {entity: any}) { }

  ngOnInit() {
    const entity = this.data.entity;
    // Prepare data to display.
    for (const field in entity) {
      // Exclude unwanted fields.
      if (typeof entity[field] !== 'object' && !['created', 'edited'].includes(field) && !entity[field].toString().startsWith('https://swapi.co')) {
        this.entityInfo.push({
          title: field.replace('_', ' '),
          value: entity[field]
        });
      }
    }
  }

}
