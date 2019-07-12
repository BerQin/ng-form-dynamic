export class AppStringClass {

  /**
   * 获取字符串长度
   * 小写英文和数字 1个单位长度
   * 大写英文 1.5个单位长度
   * 汉字 2个单位长度
   * @param strs string (需要查询长度的字符串)
   * @return number;
   */
  public getStringLen(strs: string = ''): number {
    let len = 0;
    if (!strs) {
      return len;
    }
    const strs_len = strs.length;
    for (let i = 0; i < strs_len; i++) {
      const charCode = strs.charCodeAt(i);
      if (charCode > 127 || charCode === 94) {
        len += 2;
      } else if (charCode >= 65 && charCode <= 90) {  // 英文大写
        len += 1.5;
      } else {
        len++;
      }
    }
    return len;
  }

}

export const AppString = new AppStringClass();
