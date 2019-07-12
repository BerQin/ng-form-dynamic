import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export class Util {

  /**
   * 中英文字符最大长度
   */
  static CharMaxLength(maxlength: number = 255): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      const value = control.value;
      if (value === null || value === undefined) {
        return null;
      }
      return value.replace(/[^\x00-\xff]/g, '01').length > maxlength ? { charmaxlength: true } : null;
    };
  }

  /**
   * 验证checkbox中至少一个选中 groupArray模式
   */
  static AtLeastOneIsTrue = (control: AbstractControl): { [key: string]: boolean } => {
    const obj = Object.keys(control.value).filter(item => control.get(item).value === true);
    return Boolean(obj.length) ? null : { nomatch: true };
  }

  /**
   * 验证checkbox中至少N个选中 非groupArray模式
   */
  static CheackedOneIsTrue(conts: number = 1): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      if (control.value && control.value.length) {
        const vals = [];
        control.value.map((item: any, index: number) => {
          if (item && item.checked) {
            vals.push(item);
          }
        });
        return Boolean(vals.length > conts - 1) ? null : { nomatch: true };
      } else {
        return { nomatch: true };
      }
    };
  }

  /**
   * emails 分割后验证
   */
  static Emails(splitStr: string = ';'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return null;
      }
      // tslint:disable-next-line:max-line-length
      const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
      const isInvalid = value.split(splitStr).filter(item => {
        return item;
      }).some(item => {
        return !EMAIL_REGEXP.test(item);
      });
      return isInvalid ? { 'emails': true } : null;
    };
  }

}
