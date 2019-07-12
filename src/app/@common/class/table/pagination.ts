import { HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { SortType } from '@common/interface/table';

import { CommonTable } from './table';

interface IPagination {

  /** 数据总数 */
  total: number;

  /** 当前页数 */
  pageIndex: number;

  /** 每页条数 */
  pageSize: number;

  /** 获取列表数据 */
  getTableList: () => void;

  /** 分页初始化前执行 */
  paginationInitBefore: () => void;

  /** 分页初始化 */
  paginationInit: () => void;

  /** 重置页码 */
  resetPageIndex: () => void;

  /** 跳转页面 */
  gotoPage: () => void;

  /** 排序 */
  sort: (sortName: string) => void;

  /** 搜索 */
  search: () => void;
}

export abstract class Pagination extends CommonTable implements IPagination {
  public searchForm: FormGroup;

  public loading = false;
  public params: HttpParams = new HttpParams();
  public total = 0;
  public pageIndex = 1;
  public pageSize = 20;
  public tableData: any[] = [];
  public sortValue: SortType = null;
  public sortKey: string = null;
  public sortMap: { [key: string]: SortType } = {
    id: null,
    create_time: 'descend',
  };
  public pageSizeOptions: number[] = [10, 20, 30, 40, 50, 100];

  constructor() {
    super();
    this.paginationInit();
  }

  getTableList(): void {}

  paginationInitBefore(): void {}

  paginationInit(): void {
    this.paginationInitBefore();
    this.params = this.params.set('pageNum', `${this.pageIndex}`);
    this.params = this.params.set('pageSize', `${this.pageSize}`);
    this.params = this.params.set('sort', 'id');
    this.params = this.params.set('order', 'desc');  // desc 降序；asc 升序
  }

  resetPageIndex(): void {
    this.pageIndex = 1;
    this.params = this.params.set('pageSize', `${this.pageSize}`);
    this.gotoPage();
  }

  gotoPage(): void {
    this.params = this.params.set('pageNum', `${this.pageIndex}`);
    this.getTableList();
    this.clearChecked(this.tableData);
  }

  sort(sortName: string): void {
    this.sortKey = sortName;
    if (this.sortMap[sortName] === null || this.sortMap[sortName] === 'ascend') {
      this.sortMap[sortName] = 'descend';
    } else if (this.sortMap[sortName] === 'descend') {
      this.sortMap[sortName] = 'ascend';
    }

    Object.keys(this.sortMap)
          .filter(item => item !== sortName)
          .forEach(item => this.sortMap[item] = null);

    this.sortValue = this.sortMap[sortName];
    this.params = this.params.set('sort', `${this.sortKey}`);
    this.params = this.params.set('order', `${this.sortValue.replace('end', '')}`);
    this.getTableList();
  }

  search(): void {
    const form = this.searchForm.value;
    this.params = this.params.delete('keyword');

    if (
      form.keyword !== null &&
      form.keyword !== undefined &&
      form.keyword !== '' &&
      form.keyword.trim() !== ''
    ) {
      this.params = this.params.set('keyword', form.keyword);
    }

    this.resetPageIndex();
  }

  searchTableData(searchTime, field): void {
    if (searchTime) {
      this.params = this.params.set(field, searchTime);
      this.getTableList();
      this[`${field}Visible`] = false;
      this[`${field}Selected`] = true;
    }
  }

  resetSearch(field): void {
    this.params = this.params.delete(field);
    this.getTableList();
    this[`${field}Visible`] = false;
    this[`${field}Selected`] = false;
  }

  onDateChange(result: Date, field): void {
    const startTime = this.jointDate(result[0]);
    const endTime = this.jointDate(result[1]);
    const selectTime = startTime + '&' + endTime;
    this[`${field}Visible`] = false;
    this[`${field}Selected`] = true;
    this.params = this.params.set(field, selectTime);
    this.getTableList();
  }

  jointDate(date): string {
    const jointMonth = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
    const jointDate = date.getDate() >= 10 ? date.getDate() : ('0' + date.getDate());
    const jointHour = date.getHours() >= 10 ? date.getHours() : ('0' + date.getHours());
    const joineMinute = date.getMinutes() >= 10 ? date.getMinutes() : ('0' + date.getMinutes());
    return date.getFullYear() + '-' + jointMonth + '-' + jointDate + ' ' + jointHour + ':' + joineMinute;
  }
}
