export interface CacheData {
  [key: string]: string | Array<string> | number | Array<number> | CacheData;
}
