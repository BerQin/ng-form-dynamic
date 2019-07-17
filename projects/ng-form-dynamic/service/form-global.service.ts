import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormGlobalService {

  public formGroups: {
    [key: string]: FormGroup
  } = {};

  constructor() { }

  /**
   * 多选数据格式化Array<string | number>
   * @param json any formSubmit json数据
   * @return data {[key: string]: any}
   */
  public checkBoxData(json: any, type: 'string' | 'array' = 'string'): {[key: string]: any} {
    if (this.isObject(json)) {
      this.forJson(json, null, (res, key, val) => {
        if (this.isChecked(val)) {
          const arr = [];
          val.map((item) => {
            if (item.checked) {
              arr.push(item.value);
            }
          });
          if (type === 'string') {
            res[key] = arr.join(',');
          } else {
            res[key] = arr;
          }
        }
      });
    }

    return json;
  }

  private isChecked(val: any): boolean {
    if (val instanceof Array) {
      if (this.isObject(val[0]) && val[0].value && val[0].label) {
        return true;
      }
    }
    return false;
  }

  /**
   * 判断是否为JSON数据
   * @param val any 检测内容
   * @return boolean 是JSON为true 否为false
   */
  private isObject(val: any): boolean {
    return val && typeof val === 'object' && !(val instanceof Array);
  }

  /**
   * 数据平级化 如果字段重新新的会覆盖旧的数据
   * @param json {[key:string]: any} 需要平级化的数据JSON
   * @param depth number 深度
   * @return data {[key: string]: any} 新的json
   */
  public peersJson(json: any, depth?: number): {[key: string]: any} {

    if (this.isObject(json)) {
      return this.forJson(json, depth);
    }

    return json;
  }

  private forJson(json: any, index?: number, fn?: Function): {[key: string]: any} {
    if (index) {
      index --;
    }
    const result: {[key: string]: any} = {};
    for (const key in json) {
      if (key) {
        if (this.isObject(json[key]) && !json[key].getFullYear) {
          if (index === undefined || index === null) {
            this.extendJson(result, this.forJson(json[key], index, fn));
            if (fn) {
              fn(json, key, json[key]);
            }
          } else if (index) {
            this.extendJson(result, this.forJson(json[key], index, fn));
            if (fn) {
              fn(json, key, json[key]);
            }
          }
        } else if (!this.isChecked(json[key]) && json[key] instanceof Array && this.isObject(json[key][0]) && !json[key][0].getFullYear) {
          json[key].forEach((res, i) => {
            if (this.isObject(res)) {
              if (index === undefined || index === null) {
                this.extendJson(result, this.forJson(json[key][i], index, fn));
                if (fn) {
                  fn(json, key, json[key]);
                }
              } else if (index) {
                this.extendJson(result, this.forJson(json[key][i], index, fn));
                if (fn) {
                  fn(json, key, json[key]);
                }
              }
            }
          });
        } else {
          result[key] = json[key];
          if (fn) {
            fn(json, key, json[key]);
          }
        }
      }
    }

    return result;
  }

  private extendJson(j1: {[key: string]: any}, j2: {[key: string]: any}): {[key: string]: any} {
    for (const key in j2) {
      if (key) {
        j1[key] = j2[key];
      }
    }
    return j1;
  }

}
