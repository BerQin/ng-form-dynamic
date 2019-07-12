import { BrowserBrand, BrowserKerne } from './browser.enum';
import { LanguageType } from '@core/language';

class BrowserClass {
  private brWindow: any = window;
  public version: string; // 版本
  public versionList: Array<string>; // 版本通过.切分的数组
  public browser: string; // 浏览器品牌(不准确)
  public kerne: string; // 内核
  public language: LanguageType; // 语言

  constructor() {
    this.init();
  }

  private init(): void {
    const info = this.getVersion();
    this.version = info.version;
    this.versionList = info.versionList || [];
    this.browser = info.browser;
    this.kerne = info.kerne;
    this.language = this.getLanguage();
  }

  private getLanguage(): LanguageType {
    for (const item in LanguageType) {
      if (item) {
        if (LanguageType[item] === this.brWindow.navigator.language) {
          return LanguageType[item] as LanguageType;
        }
      }
    }
    return LanguageType.default;
  }

  private getVersion(): {
    version: string;
    versionList?: Array<string>;
    browser: string;
    kerne: string;
  } {
    const rMsie = /(msie\s|trident\/7)([\w\.]+)/;
    const rTrident = /(trident)\/([\w.]+)/;
    const rEdge = /(chrome)\/([\w.]+)/; // IE

    const rFirefox = /(firefox)\/([\w.]+)/; // 火狐
    const rOpera = /(opera).+version\/([\w.]+)/; // 旧Opera
    const rNewOpera = /(opr)\/(.+)/; // 新Opera 基于谷歌
    const rChrome = /(chrome)\/([\w.]+)/; // 谷歌
    const rUC = /(chrome)\/([\w.]+)/; // UC
    const rMaxthon = /(chrome)\/([\w.]+)/; // 遨游
    const r2345 =  /(chrome)\/([\w.]+)/; // 2345
    const rQQ =  /(chrome)\/([\w.]+)/; // QQ
    // const rMetasr =  /(metasr)\/([\w.]+)/; // 搜狗
    const rSafari = /version\/([\w.]+).*(safari)/; // Safari
    const ua = navigator.userAgent.toLowerCase();

    let matchBS, matchBS2;

    // IE 低版
    matchBS = rMsie.exec(ua);
    if (matchBS != null) {
      matchBS2 = rTrident.exec(ua);
      if (matchBS2 != null) {
        switch (matchBS2[2]) {
          case '4.0':
            return {
              browser: BrowserBrand.IE,
              version: '8', // 内核版本号
              kerne: BrowserKerne.IE
            };
          case '5.0':
            return {
              browser: BrowserBrand.IE,
              version: '9',
              kerne: BrowserKerne.IE
            };
          case '6.0':
            return {
              browser: BrowserBrand.IE,
              version: '10',
              kerne: BrowserKerne.IE
            };
          case '7.0':
            return {
              browser: BrowserBrand.IE,
              version: '11',
              kerne: BrowserKerne.IE
            };
          default:
            return {
              browser: BrowserBrand.IE,
              version: undefined,
              kerne: BrowserKerne.IE
            };
        }
      } else {
        return {
          browser: BrowserBrand.IE,
          version: matchBS[2],
          kerne: BrowserKerne.IE
        };
      }
    }

    // 谷歌浏览器
    matchBS = rChrome.exec(ua);
    if ((matchBS != null) && (!(this.brWindow.attachEvent))) {
      matchBS2 = rNewOpera.exec(ua);
      if (matchBS2 == null) {
        return {
          browser: BrowserBrand.Google,
          version: matchBS[2],
          kerne: BrowserKerne.Chrome,
          versionList: matchBS[2].split('.')
        };
      } else {
        return {
          browser: BrowserBrand.Opera,
          version: matchBS2[2],
          kerne: BrowserKerne.Opera,
          versionList: matchBS[2].split('.')
        };
      }
    }

    // 火狐浏览器
    matchBS = rFirefox.exec(ua);
    if ((matchBS != null) && (!(this.brWindow.attachEvent))) {
      return {
        browser: BrowserBrand.Firefox,
        version: matchBS[2],
        kerne: BrowserKerne.Mozilla,
        versionList: matchBS[2].split('.')

      };
    }

    // Safari（苹果）浏览器
    matchBS = rSafari.exec(ua);
    if ((matchBS != null) && (!(this.brWindow.attachEvent)) && (!(this.brWindow.chrome)) && (!(this.brWindow.opera))) {
      return {
        browser: BrowserBrand.Safari,
        version: matchBS[1],
        kerne: BrowserKerne.Safari,
        versionList: matchBS[2].split('.')
      };
    }

    // IE最新版
      matchBS = rEdge.exec(ua);
    if ((matchBS != null) && (!(this.brWindow.attachEvent))) {
      return {
        browser: BrowserBrand.Edge,
        version: matchBS[2],
        kerne: BrowserKerne.Chrome,
        versionList: matchBS[2].split('.')
      };
    }

    // UC浏览器
    matchBS = rUC.exec(ua);
    if ((matchBS != null) && (!(this.brWindow.attachEvent))) {
      return {
        browser: BrowserBrand.UC,
        version: matchBS[2],
        kerne: BrowserKerne.Chrome,
        versionList: matchBS[2].split('.')
      };
    }

    // 遨游
      matchBS = rMaxthon.exec(ua);
    if ((matchBS != null) && (!(this.brWindow.attachEvent))) {
      return {
        browser: BrowserBrand.AoYou,
        version: matchBS[2],
        kerne: BrowserKerne.Chrome,
        versionList: matchBS[2].split('.')
      };
    }

    // 2345浏览器
    matchBS = r2345.exec(ua);
    if ((matchBS != null) && (!(this.brWindow.attachEvent))) {
      return {
        browser: BrowserBrand.T2345,
        version: matchBS[2],
        kerne: BrowserKerne.Chrome,
        versionList: matchBS[2].split('.')
      };
    }

    // QQ浏览器
    matchBS = rQQ.exec(ua);
    if ((matchBS != null) && (!(this.brWindow.attachEvent))) {
      return {
        browser: BrowserBrand.QQ,
        version: matchBS[2],
        kerne: BrowserKerne.Chrome,
        versionList: matchBS[2].split('.')
      };
    }
  }

}

export const Browser = new BrowserClass();
