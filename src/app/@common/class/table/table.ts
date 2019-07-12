export abstract class ICommonTable {
  /**
   * 是否全部已选中
   */
  allChecked?: boolean;

  /**
   * 是否至少选中一项
   */
  indeterminate?: boolean;

  /**
   * 已选中的id队列
   */
  checkedIds?: any[];

  /**
   * 刷新状态
   */
  refreshStatus?: (table: any[]) => void;

  /**
   * 选择全部
   */
  checkAll?: (table: any[], value: boolean) => void;

  /**
   * 删除选定项
   */
  removeItem?: (table: any[]) => any[];

  /**
   * 清除已选中项
   */
  clearChecked?: (table: any[]) => void;
}

export class CommonTable implements ICommonTable {
  public allChecked = false;
  public indeterminate = false;
  public checkedIds: any[] = [];

  public refreshStatus(table: any[]): void {
    const allChecked = table.every(value => value.checked === true) && table.length > 0;
    const allUnChecked = table.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.checkedIds = table.filter(item => item.checked === true).map(item => item.id);
  }

  public checkAll(table: any[], value: boolean): void {
    table.forEach(data => data.checked = value);
    this.refreshStatus(table);
    this.checkedIds = table.filter(item => item.checked === true).map(item => item.id);
  }

  public removeItem(table: any[]): any[] {
    return table.filter(item => item.checked !== true);
  }

  public clearChecked(table: any[]): void {
    const result = table.map(item => item.checked = false);
    this.refreshStatus(result);
  }
}
