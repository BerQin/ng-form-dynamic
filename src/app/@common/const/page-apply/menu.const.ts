import { Menu } from '@common/interface/page-apply';

export const MENU_LIST: Array<Menu> = [
  {
    attributes: {
      icon: null,
      router: '',
      title: '项目使用',
    },
    children: [
      {
        attributes: {
          icon: 'home',
          router: '/home/main',
          title: '项目介绍',
        },
        children: [
          {
            attributes: {
              icon: null,
              router: '/home/main/update-log',
              title: '更新日志',
            },
            children: []
          },
          {
            attributes: {
              icon: null,
              router: '/home/main/catalog',
              title: '项目结构',
            },
            children: []
          },
          {
            attributes: {
              icon: null,
              router: '/home/main/file-catalog',
              title: '使用介绍',
            },
            children: []
          },
        ]
      },
      {
        attributes: {
          icon: 'flag',
          router: '/home/examples',
          title: '样例展示',
        },
        children: [
          {
            attributes: {
              icon: 'book',
              router: '/home/examples/basic',
              title: '基础组件',
            },
            children: [
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/table',
                  title: 'Table 表格',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/input',
                  title: 'Input 输入框',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/dropdown',
                  title: 'Dropdown 下拉菜单',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/checkbox',
                  title: 'Checkbox 多选框',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/datepicker',
                  title: 'Datepicker 日期选择',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/select',
                  title: 'Select 选择器',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/switch',
                  title: 'Switch 开关',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/transfer',
                  title: 'Transfer 穿梭框',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/tree',
                  title: 'Tree 树状结构',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/tabs',
                  title: 'Tabs 标签页',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/card',
                  title: 'Card 卡片',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/tooltip',
                  title: 'Tooltip 消息提示',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/timeline',
                  title: 'Timeline 时间轴',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/message',
                  title: 'Message 全局提示',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/basic/modal',
                  title: 'Modal 对话框',
                },
                children: []
              }
            ]
          },
          {
            attributes: {
              icon: 'copy',
              router: '/home/examples/recombination',
              title: '复合组件',
            },
            children: [
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/recombination/code',
                  title: 'Code 代码展示',
                },
                children: []
              },
            ]
          },
          {
            attributes: {
              icon: 'file-pdf',
              router: '/home/examples/cfunction',
              title: '通用方法/类',
            },
            children: [
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/cfunction/date',
                  title: 'Date 时间类',
                },
                children: []
              },
            ]
          },
          {
            attributes: {
              icon: 'file-pdf',
              router: '/home/examples/coreclass',
              title: '核心类',
            },
            children: [
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/coreclass/browser',
                  title: 'Browser 浏览器',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/coreclass/cache',
                  title: 'Cache 缓存',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/coreclass/cookie',
                  title: 'Cookie',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/coreclass/language',
                  title: 'Language 语言',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/coreclass/logger',
                  title: 'Logger 打印输出',
                },
                children: []
              },
              {
                attributes: {
                  icon: null,
                  router: '/home/examples/coreclass/request',
                  title: 'Request 请求',
                },
                children: []
              },
            ]
          },
        ]
      },
      // {
      //   attributes: {
      //     icon: 'cloud',
      //     router: '/home/introduce',
      //     title: '相关网站',
      //   },
      //   children: []
      // }
    ]
  },
  {
    attributes: {
      icon: null,
      router: 'http://ng.components.qihoo.net',
      isblank: true,
      title: 'AntResetPrivateUI组件库',
    },
    children: [],
  },
  {
    attributes: {
      icon: null,
      router: 'https://github.com/BerQin/drawTopology',
      isblank: true,
      title: 'DrawTopology',
    },
    children: [],
  },
  {
    attributes: {
      icon: null,
      router: 'https://echarts.baidu.com/examples/',
      isblank: true,
      title: 'Echart',
    },
    children: [],
  },
  {
    attributes: {
      icon: null,
      router: 'https://www.iconfont.cn/',
      isblank: true,
      title: '阿里IconFont',
    },
    children: [],
  }
];


