import { Subject } from 'rxjs';

export interface ISort {
  /** 正序 */
  asc: string;

  /** 倒序 */
  desc: string;

  /** 正序 */
  ascend: string;

  /** 倒序 */
  descend: string;
}

/** 排序类型 */
export type SortType = keyof ISort;

/**
   * 销毁时触发
   * ### Example
   * ```
   *  import { Subject } from 'rxjs';
   *  import { takeUntil } from 'rxjs/operators';
   *
   *  ngOnDestroy() {
   *    this.destroy$.next();
   *    this.destroy$.unsubscribe();
   *  }
   * ```
   */
export interface UseReactive {
  destroy$: Subject<any>;
  init?: () => void;
}
