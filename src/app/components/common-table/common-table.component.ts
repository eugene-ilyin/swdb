import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PopupService} from "../../services/popup.service";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {TableDataConfig} from "../../interfaces/table.interface";
import {TableService} from "../../services/table.service";

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.less']
})
export class CommonTableComponent {

  @Input() dataSource: MatTableDataSource<any[]>;
  @Input() tableConfig: TableDataConfig[];
  @Input() tableColumns: string[];
  @Input() resultsCount: number;
  @Input() pageNumber: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private popupService: PopupService,
              private tableService: TableService) { }

  showInfo(data) {
    this.popupService.openDialog(data);
  }

  pageEvent($event) {
    this.tableService.switchTablePage($event.pageIndex);
  }
}
