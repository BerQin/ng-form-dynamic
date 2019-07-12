export class HttpUtil {

  static errorMessage(err: any): any {
    return err.message || (err.error && err.error.message) || null;
  }

}
