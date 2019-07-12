export interface Menu {
  id?: string | number;
  attributes: Attribute;
  children: Array<Menu>;
  parents?: Array<Menu>;
}

export interface Breadcrumb {
  path: string;
  breadcrumb: string;
}

interface Attribute {
  title: string;  // 菜单名称
  router: string; // 路由
  disable?: string; // 是否disable
  iconImage?: string; // 图标base64
  icon?: string;  // class
  isExpanded?: boolean; // 是否展开
  isblank?: boolean; // 是否新窗口打开
}
