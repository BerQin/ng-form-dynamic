
import { ValidatorFn, AbstractControlOptions } from '@angular/forms';
import { Observable } from 'rxjs';

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
  value: any | [ValueOption, ValidatorFn | ValidatorFn[] | AbstractControlOptions | null];
  placeholder?: string;
  errorMsg?: {
    [key: string]: string
  };
  formArray?: FormArrayItem;
  formGroup?: FormGroupItem;
}

export interface FormArrayItem {
  [key: string]: FormGroupOption[];
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
