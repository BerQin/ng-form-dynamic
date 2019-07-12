/**
 * @name cookie参数
 * @description
 * @param {sting} path 路径
 * @param {string} domain cookie作用到的域
 * @param {string | Date } expires 失效时长
 * @param {boolean} httpOnly 是否只读
 * @param {boolean} storeUnencoded 如果是“true”，那么cookie值将不会被编码，而是按照提供的方式存储。
 */
export interface CookieOptions {
  path?: string;
  domain?: string;
  expires?: string|Date;
  secure?: boolean;
  httpOnly?: boolean;
  storeUnencoded?: boolean;
}
