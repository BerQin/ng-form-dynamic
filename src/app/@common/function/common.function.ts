import { HttpEventType, HttpEvent } from '@angular/common/http';
import { ResponseBody } from '@common/interface/http';


export function getProgress(event: HttpEvent<any>) {
  switch (event.type) {
    case HttpEventType.DownloadProgress:
    case HttpEventType.UploadProgress:
      return Math.round(100 * event.loaded / event.total);
  }
}

/**
 * 获取树上每个节点的叶节点个数以及所在层数
 * @param item 树节点
 * @param level 当前所在层数
 */
export function getLeftCount(item: any, level: number): number {
  const nextLevel = level + 1;
  item.level = level;
  if (!item.children || (item.children && item.children.length === 0)) {
    item.leafCount = 1;
    return 1;
  }
  let leafCount = 0;
  for (const child of item.children) {
    leafCount += getLeftCount(child, nextLevel);
  }
  item.leafCount = leafCount;
  return leafCount;
}

export function isSelfOrAncestorNode(ancestor: Node, node: Node): boolean {
  while (node) {
    if (node === ancestor) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

export function ApplyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

