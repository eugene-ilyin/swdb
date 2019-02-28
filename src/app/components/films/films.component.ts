import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SWResourceService} from "../../resources/sw-resource.service";
import {MatTableDataSource} from "@angular/material";
import {TableDataConfig} from "../../interfaces/table.interface";
import {BehaviorSubject, Subscription} from "rxjs/index";
import {FormControl, FormGroup} from "@angular/forms";
import {CommonTableComponent} from "../common-table/common-table.component";
import {TableService} from "../../services/table.service";

@Component({
  selector: 'app-movies',
  templateUrl: './films.component.html',
})
export class FilmsComponent implements OnInit, AfterViewInit, OnDestroy {

  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private subs: Subscription[] = [];

  tableConfig: TableDataConfig[] = [
    {dataKey: 'episode_id', title: 'Episode'},
    {dataKey: 'title', title: 'Title'},
    {dataKey: 'director', title: 'Director'},
    {dataKey: 'producer', title: 'Producer', isWide: true},
    {dataKey: 'release_date', title: 'Release date'},
    {dataKey: 'opening_crawl', title: 'Opening crawl', isWide: true},
  ];

  tableColumns = this.tableService.getTableColumns(this.tableConfig);
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource([]);
  isTableLoading = false;
  resultsCount = 0;
  pageNumber = 0;

  // Fields for filters.
  filterForm = new FormGroup({
    search: new FormControl(''),
    director: new FormControl(''),
    producer: new FormControl(''),
  });

  frontFilters = [
    'director',
    'producer'
  ];
  selectFilterNames: string[] = [
    'director'
  ];
  directorFilterValues: string[];

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
    this.swResource.loadFilms(searchTerm).subscribe(data => {
      this.resultsCount = data.count;
      this.pageNumber = pageIndex;
      this.dataSource.data = data.results;

      // New data - reset filters on front.
      this.frontFilters.forEach(fieldName => {
        this.filterForm.controls[fieldName].setValue('');
      });

      // Prepare values for filter by director (selectbox).
      this.directorFilterValues = this.tableService.getSelectFilterValues(data.results, 'director');
      this.isTableLoading = false;
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
