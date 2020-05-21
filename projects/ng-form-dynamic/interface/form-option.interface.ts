
import { ValidatorFn, AbstractControlOptions } from '@angular/forms';
import { Observable } from 'rxjs';
import { ElementRef } from '@angular/core';

export interface FormOption {
  label: string;
  key: string;
  type: 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date';
  derivativeType?: 'number' | 'button' | 'date' | 'month' | 'year' | 'week';
  dateFormat?: string;  //  仅时间date类型使用
  valueFormat?: string;  //  仅时间date类型使用
  showTime?: boolean;  //  仅时间date类型使用
  selectOptions?: SelectOption[] | Observable<SelectOption[]>;  //  radio select checkbox 类型使用
  required?: boolean;
  hide?: boolean; // 是否显示出来 用于值记录的
  value: any | [ValueOption, ValidatorFn | ValidatorFn[] | AbstractControlOptions | null];
  placeholder?: string;
  errorMsg?: {
    [key: string]: string
  };
  style?: {[key: string]: string};
  configNzSpan?: {
    label?: number;
    control?: number;
  };
  configNzOffset?: {
    label?: number;
    control?: number;
  };
  extTemplate?: ElementRef;
  formArray?: FormArrayItem;
  formGroup?: FormGroupItem;
}

export interface FormArrayItem {
  [key: string]: FormGroupArrOption;
}

export interface FormGroupArrOption {
  groupsArr: Array<FormOption[]>;
  key: string;
}

export interface FormGroupItem {
  [key: string]: FormGroupOption;
}

export interface FormGroupOption {
  groups: FormOption[];
  key: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
  tips?: string;
  checked?: boolean;
}

export interface ValueOption {
  value: any;
  required?: boolean;
  disabled?: boolean;
}
