class CacheFunClass {

  /**
   * JSON数据下钻
   * @param data any 源数据
   * @param key any 键
   * @return any 源数据对应的下钻内容
   */
  public runInHole(data: any, key: string): any {
    if (this.isObject(data)) {
      return data[key];
    }
    return null;
  }

  /**
   * 判断是否为JSON数据
   * @param val any 检测内容
   * @return boolean 是JSON为true 否为false
   */
  public isObject(val: any): boolean {
    return typeof val === 'object' && !(val instanceof Array);
  }

  /**
   * 获取JSON数据的键
   * @param data any 源数据
   * @return string[] 所有键数组
   */
  public getObjectKey(data: any): string[] {
    const result: string[] = [];
    if (this.isObject(data)) {
      for (const i in data) {
        if (i) {
          result.push(i);
        }
      }
    }
    return result;
  }

}

export const CacheFun = new CacheFunClass();
