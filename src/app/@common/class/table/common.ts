import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';

import { UseReactive } from '@common/interface/table';

import { Pagination } from './pagination';

export interface ICommon {
  /** 是否显示调试信息 */
  isDebug?: boolean;

  /** 是否显示下一版功能 */
  isNext?: boolean;

  /** 表单 */
  form?: FormGroup;

  /** 列表 */
  list?: any[];

  /** 是否编辑模式 */
  isEdit?: boolean;

  /** 是否提交中 */
  submiting?: boolean;

  /** 弹窗显示状态 */
  modalVisible?: boolean;

  /** 表单初始化 */
  formInit?: () => void;

  /** 添加表单监听器 */
  addFormListener?: () => void;

  /** 创建 */
  create?: () => void;

  /** 编辑 */
  edit?: (data?: any) => void;

  /** 打开弹窗 */
  openModal?: () => void;

  /** 关闭弹窗 */
  closeModal?: () => void;

  /** 提交前处理form数据 */
  submitBefore?: () => void;

  /** 编辑前处理form数据 */
  editBefore?: (data: any) => any;

  /** 保存 */
  save?: (data?: any) => void;

  /** 更新 */
  update?: () => void;

  /** 销毁前触发 */
  destroyBefore?: () => void;
}

export class Common extends Pagination implements OnDestroy, UseReactive, ICommon {

  public isDebug: boolean;
  public isNext: boolean;

  public form: FormGroup;
  public list: any[] = [];
  public isEdit: boolean;
  public submiting: boolean;
  public modalVisible = false;

  public destroy$: Subject<any> = new Subject<any>();
  public getData$: Subject<string> = new Subject<string>();

  constructor() {
    super();
  }

  destroyBefore(): void { }

  ngOnDestroy() {
    this.destroyBefore();
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
