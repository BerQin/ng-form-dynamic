import { environment } from '@environments/environment';

export class LoggerClass {
  private InDevelop: Boolean = true;

  constructor() {
    this.InDevelop = !environment.production;
  }

  /**
   * 普通打印信息
   * @param args ...args Array<any> 内容
   * @return void
   */
  get log() {
    if (this.InDevelop) {
      return console.log;
    } else {
      return () => {};
    }
  }

  /**
   * 警告打印信息
   * @param args ...args Array<string> 内容
   * @return void
   */
  get warn() {
    if (this.InDevelop) {
      return console.warn;
    } else {
      return () => {};
    }
  }

  /**
   * 错误打印信息
   * @param args ...args Array<string> 内容
   * @return void
   */
  get error() {
    if (this.InDevelop) {
      return console.error;
    } else {
      return () => {};
    }
  }

  /**
   * 计数打印
   * @param content any 计数内容
   * @return void
   */
  get count() {
    if (this.InDevelop) {
      return console.count;
    } else {
      return () => {};
    }
  }

  /**
   * 表格打印
   * @param content Array<{[key: string]: any}> 表格内容数组
   * @return void
   */
  get table() {
    if (this.InDevelop) {
      return console.table;
    } else {
      return () => {};
    }
  }

  /**
   * DOM打印 显示 DOM 节点
   * @param content Element 需要打印的DOM
   * @return void
   */
  get dirxml() {
    if (this.InDevelop) {
      return console.dirxml;
    } else {
      return () => {};
    }
  }

  /**
   * 断言打印
   * @param content any 需要判断的内容
   * @param msg string 需要打印的报错内容
   * @return void
   */
  get assert() {
    if (this.InDevelop) {
      return console.assert;
    } else {
      return () => {};
    }
  }

  /**
   * 开始记录时间
   * @param key string 键
   * @return void
   */
  get time() {
    if (this.InDevelop) {
      return window.console.time;
    } else {
      return () => {};
    }
  }

  /**
   * 结束记录时间 并统计时间
   * @param key string 键
   * @return void
   */
  get timeEnd() {
    if (this.InDevelop) {
      return window.console.timeEnd;
    } else {
      return () => {};
    }
  }

  /**
   * 打印方法运行时间
   * @param key string 键
   * @param fun string 测试方法
   * @return void
   */
  logTime(key: string, fun: Function): void {
    if (this.InDevelop) {
      this.time(key);
      if (fun) {
        fun();
      }
      this.timeEnd(key);
    }
  }

  /**
   * 创建打印组标题  配合groupEnd使用
   * @param title string 组标题
   * @return void
   */
  get group() {
    if (this.InDevelop) {
      return console.group;
    } else {
      return () => {};
    }
  }

  /**
   * 结束组
   * @return void
   */
  get groupEnd() {
    if (this.InDevelop) {
      return console.groupEnd;
    } else {
      return () => {};
    }
  }
}

export const Logger = new LoggerClass();
