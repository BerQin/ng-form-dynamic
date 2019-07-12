class AppNumberClass {
    /**
   * 小于10补全0
   * @param num number (需要补全数字)
   * @return string;
   */
  public addZro(num: number): string {
    let returnData = '';
    returnData = num > 10 ? String(num) : '0' + String(num);
    return returnData;
  }
}

export const AppNumber = new AppNumberClass();
