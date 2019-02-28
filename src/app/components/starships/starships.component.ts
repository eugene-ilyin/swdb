import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SWResourceService} from "../../resources/sw-resource.service";
import {MatTableDataSource} from "@angular/material";
import {TableDataConfig} from "../../interfaces/table.interface";
import {BehaviorSubject, Subscription} from "rxjs/index";
import {FormControl, FormGroup} from "@angular/forms";
import {CommonTableComponent} from "../common-table/common-table.component";
import {TableService} from "../../services/table.service";

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
})
export class StarshipsComponent implements OnInit, AfterViewInit, OnDestroy {

  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private subs: Subscription[] = [];

  tableConfig: TableDataConfig[] = [
    {dataKey: 'name', title: 'Name'},
    {dataKey: 'model', title: 'Model', isWide: true},
    {dataKey: 'manufacturer', title: 'Manufacturer', isWide: true},
    {dataKey: 'cost_in_credits', title: 'Cost', isWide: true},
    {dataKey: 'length', title: 'Length', isWide: true},
    {dataKey: 'max_atmosphering_speed', title: 'Max speed'},
    {dataKey: 'crew', title: 'Crew', isWide: true},
    {dataKey: 'starship_class', title: 'Starship class'},
  ];

  tableColumns = this.tableService.getTableColumns(this.tableConfig);
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource([]);
  isTableLoading = false;
  resultsCount = 0;
  pageNumber = 0;

  // Fields for filters.
  filterForm = new FormGroup({
    search: new FormControl(''),
    model: new FormControl(''),
    starship_class: new FormControl(''),
  });

  frontFilters = [
    'model',
    'starship_class'
  ];
  selectFilterNames: string[] = [
    'starship_class'
  ];
  starshipClassFilterValues: string[];

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
    this.swResource.loadStarShips(searchTerm, pageIndex).subscribe(data => {
      this.resultsCount = data.count;
      this.pageNumber = pageIndex;
      this.dataSource.data = data.results;

      // New data - reset filters on front.
      this.frontFilters.forEach(fieldName => {
        this.filterForm.controls[fieldName].setValue('');
      });

      // Prepare values for filter by starship class (selectbox).
      this.starshipClassFilterValues = this.tableService.getSelectFilterValues(data.results, 'starship_class');
      this.isTableLoading = false;
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
