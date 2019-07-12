class AppDateClass {
  /**
   * 快速获取当前日期的前N日日期，快捷获取前1日，前7日，前30日
   * @param type number (快捷类型默认0)
   * @param daysago number (前N日)(可选)
   * @return Array<string>
   */
  public getDateScope(type: number = 0, daysago?: number): Array<string> {
    const today = this.getEarlyData(0);
    let returnData = [];

    if (type === 0) {
      if (daysago) {
        const yesToday = this.getEarlyData(daysago);
        returnData = [this.getDateFormat(yesToday), this.getDateFormat(today)];
      } else {
        returnData = [this.getDateFormat(today), this.getDateFormat(today)];
      }
    } else {
      switch (type) {
        case 1:
          returnData = [this.getDateFormat(today), this.getDateFormat(today)];
          break;
        case 2:
          const yesToday = this.getEarlyData(1);
          returnData = [this.getDateFormat(yesToday), this.getDateFormat(today)];
          break;
        case 3:
          const yes7Today = this.getEarlyData(7);
          returnData = [this.getDateFormat(yes7Today), this.getDateFormat(today)];
          break;
        case 4:
          const yes30Today = this.getEarlyData(30);
          returnData = [this.getDateFormat(yes30Today), this.getDateFormat(today)];
          break;
      }
    }
    return returnData;
  }

  /**
   * 快速获取当前日期的前N日对象
   * @param daysago number (多少日前)
   * @return Date
   */
  public getEarlyData(daysago: number): Date {
    const today = new Date();
    const dayago = new Date(today.getTime() - 86400000 * daysago);
    return dayago;
  }

  /**
   * 对日期对象进行快速的格式化
   * @param date Date (日期对象)
   * @param format string (格式化变量：'yyyy-MM-dd HH:mm:ss')
   * @return string
   */
  public getDateFormat(date: Date, format?: string): string {
    format = format || 'yyyy-MM-dd HH:mm:ss';

    const o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      // tslint:disable-next-line:object-literal-key-quotes
      'S': date.getMilliseconds() // 毫秒
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }

    return format;
  }
}

export const AppDate = new AppDateClass();
