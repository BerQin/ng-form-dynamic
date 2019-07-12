import { ResponseBody } from '@common/interface/http';

/**
 * 1100011  没有登陆
 * 1000004  页面不存在
 */
export function ThrowError(res: ResponseBody<any>, target: any) {
  if (res.code === '1000004') {
    goNotPages(target);
  }
  if (
    res !== null &&
    res.code !== undefined &&
    isError(res.code)
  ) {
    throw res;
  }
  if (res === null) {
    throw {
      msg: '数据异常'
    };
  }
}

export function isError(code: string): boolean {
  const successCodeList = ['1100000', '1000000', '4200000'];
  if (successCodeList.indexOf(code) === -1) {
    return true;
  }
  return false;
}

export function getUrl(param: string) {
  const local = window.location;
  return local[param];
}

export function goNotPages(target) {
  target.router.navigate(['/error']);
}
