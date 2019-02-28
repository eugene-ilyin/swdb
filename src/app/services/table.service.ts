import {Injectable} from '@angular/core';
import {Subscription} from "rxjs/index";
import {debounceTime} from "rxjs/internal/operators";
import {TableDataConfig} from "../interfaces/table.interface";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private component: any;
  constructor() { }

  /**
   * Prepares the list of column titles for table.
   */
  getTableColumns(tableConfig: TableDataConfig[]): string[] {
    return tableConfig.reduce((acc, cur) => {
      acc.push(cur.dataKey);
      return acc;
    }, []);
  }

  /**
   * Custom callback to filter the table.
   */
  tableFilter(): (data: any, filter: string) => boolean {
    return (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      for (let filterName in searchTerms) {
        // Exact comparison for selectbox filters.
        if (this.component.selectFilterNames && this.component.selectFilterNames.includes(filterName)) {
          if (searchTerms[filterName] !== '' && data[filterName] !== searchTerms[filterName]) {
            return false;
          }
        }
        // Substring comparison for text filters.
        else {
          if (data[filterName].indexOf(searchTerms[filterName]) === -1) {
            return false;
          }
        }
      }
      return true;
    };
  }

  /**
   * Prepares values for selectbox filter.
   */
  getSelectFilterValues(sourceData: any[], columnKey: string): string[] {
    let selectValues = sourceData.reduce((acc, cur) => {
      acc.push(cur[columnKey]);
      return acc;
    }, []);
    // Remove duplicates.
    selectValues = selectValues.filter((elem, index, arr) => {
      return arr.indexOf(elem) === index;
    });

    return selectValues;
  }

  /**
   * Initializes table - loads data, activates filters.
   */
  initTable(component: any): Subscription[] {
    this.component = component;
    const filterSubs = [];

    // Subscribe to subject for search by term with a delay.
    filterSubs.push(
      component.searchTermSubject.pipe(debounceTime(500)).subscribe(searchTerm => {
        component.loadTableData(searchTerm);
      })
    );

    // Search by text.
    filterSubs.push(
      component.filterForm.controls.search.valueChanges.subscribe(searchTerm => component.searchTermSubject.next(searchTerm))
    );

    // Applies new data from user input to filters.
    component.frontFilters.forEach(filterName => {
      filterSubs.push(
        component.filterForm.controls[filterName].valueChanges
          .subscribe(() => {
            if (component.dataSource) {
              const filterValues = {};
              component.frontFilters.forEach((filterName: string) => {
                filterValues[filterName] = component.filterForm.controls[filterName].value;
              });
              component.dataSource.filter = JSON.stringify(filterValues);
            }
          })
      );
    });
    return filterSubs;
  }

  switchTablePage(pageIndex) {
    this.component.loadTableData(this.component.filterForm.controls.search.value, pageIndex);
  }
}
