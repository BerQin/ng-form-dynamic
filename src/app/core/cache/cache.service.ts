import { Injectable } from '@angular/core';
import { CacheFun } from './cache.dep';
import { CacheData } from './cache.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: CacheData = {};

  constructor() {
  }

  /**
   * 设置缓存
   * @param key string 键
   * @param val any 值
   * @param type string 存储类型，temp | local
   * @return CacheData 缓存整体数据
   */
  public setCache(key: string, val: any, type?: 'temp' | 'local'): CacheData {

    if (!type || type === 'temp') {
      this.cache[key] = val;
      return {...this.cache};
    } else {
      const valSave: string = typeof val === 'object' ? JSON.stringify(val) : val;
      localStorage.setItem(key, valSave);
      return {
        key: key,
        val: val,
      };
    }
  }

  /**
   * 获取缓存
   * @param key string 键
   * @param type string 存储类型，temp | local
   * @return any 键值对应的数据
   */
  public getCache(key: string, type?: 'temp' | 'local'): any {
    if (!type || type === 'temp') {
      return this.cache[key];
    } else {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    }
  }

  /**
   * 清除所有缓存
   * @param type string 存储类型，temp | local
   * @return CacheData 缓存整体数据
   */
  public clearAll(type?: 'temp' | 'local'): CacheData {
    if (!type || type === 'temp') {
      for (const item in this.cache) {
        if (item) {
          this.clear(item);
        }
      }

      return {...this.cache};
    } else {
      localStorage.clear();
      return {};
    }
  }

  /**
   * 清除指定键缓存
   * @param key string 键
   * @param type string 存储类型，temp | local
   * @return CacheData 缓存整体数据
   */
  public clear(key: string, type?: 'temp' | 'local'): CacheData {
    if (!type || type === 'temp') {
      if (key && this.cache[key]) {
        delete this.cache[key];
      }
      return {...this.cache};
    } else {
      localStorage.removeItem(key);
      return {};
    }
  }

  /**
   * 获取所有的键
   * @param key ...string 键>键...
   * @return string[] 对象下的所有键 如果没有返回空数组
   */
  public getCacheKey(...key: Array<string>): string[] {
    let result: string[] = [];
    if (key.length) {
      let TEMPDATA: CacheData = this.cache;
      key.map((item, index) => {
        if (CacheFun.isObject(TEMPDATA[item])) {
          TEMPDATA = CacheFun.runInHole(TEMPDATA, item);
          if (index === key.length - 1) {
            result = CacheFun.getObjectKey(TEMPDATA);
          }
        }
      });
    } else {
      result = CacheFun.getObjectKey(this.cache);
    }
    return result;
  }
}
