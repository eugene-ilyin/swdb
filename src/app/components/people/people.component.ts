import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SWResourceService} from "../../resources/sw-resource.service";
import {MatTableDataSource} from "@angular/material";
import {TableDataConfig} from "../../interfaces/table.interface";
import {BehaviorSubject, Subscription} from "rxjs/index";
import {FormControl, FormGroup} from "@angular/forms";
import {CommonTableComponent} from "../common-table/common-table.component";
import {TableService} from "../../services/table.service";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
})
export class PeopleComponent implements OnInit, AfterViewInit, OnDestroy {

  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private subs: Subscription[] = [];

  tableConfig: TableDataConfig[] = [
    {dataKey: 'name', title: 'Name'},
    {dataKey: 'height', title: 'Height'},
    {dataKey: 'mass', title: 'Mass'},
    {dataKey: 'hair_color', title: 'Hair color', isWide: true},
    {dataKey: 'skin_color', title: 'Skin color', isWide: true},
    {dataKey: 'eye_color', title: 'Eye color', isWide: true},
    {dataKey: 'birth_year', title: 'Birth year', isWide: true},
    {dataKey: 'gender', title: 'Gender', isWide: true},
  ];

  tableColumns = this.tableService.getTableColumns(this.tableConfig);
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource([]);
  isTableLoading = false;
  resultsCount = 0;
  pageNumber = 0;

  // Fields for filters.
  filterForm = new FormGroup({
    search: new FormControl(''),
    name: new FormControl(''),
    gender: new FormControl(''),
  });

  frontFilters = [
    'name',
    'gender'
  ];
  selectFilterNames: string[] = [
    'gender'
  ];
  genderFilterValues: string[];

  @ViewChild(CommonTableComponent) commonTable;

  constructor(private swResource: SWResourceService,
              private tableService: TableService) { }

  ngOnInit() {
    // Pass the component to service for initialization of the table.
    this.subs = this.subs.concat(this.tableService.initTable(this));
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = this.tableService.tableFilter();
    this.dataSource.paginator = this.commonTable.paginator;
  }

  loadTableData(searchTerm = '', pageIndex = 0) {
    this.isTableLoading = true;
    this.swResource.loadPeople(searchTerm, pageIndex).subscribe(data => {
      this.resultsCount = data.count;
      this.pageNumber = pageIndex;
      this.dataSource.data = data.results;

      // New data - reset filters on front.
      this.frontFilters.forEach(fieldName => {
        this.filterForm.controls[fieldName].setValue('');
      });

      // Prepare values for filter by gender (selectbox).
      this.genderFilterValues = this.tableService.getSelectFilterValues(data.results, 'gender');
      this.isTableLoading = false;
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
