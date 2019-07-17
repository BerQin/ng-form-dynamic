
# ng-form-dynamic
> angular7+以上的版本可以使用；进行动态表单配置生成满足通常情况下的使用需求

> 支持单行扩展模板，请使用``extTemplate``属性配置


## 1、开始使用
## <a id="install">安装</a>

```
npm i ant-reset-private
npm i ng-form-dynamic
```

## <a id="use">使用</a>

首先要配置``ant-reset-private``UI组件引入

``NgFormDynamicModule`` 需要在组件所在的model中引入

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgFormDynamicModule } from 'ng-form-dynamic';
import { NZ_I18N, zh_CN, NZ_NOTIFICATION_CONFIG, NgZorroAntdModule } from 'ant-reset-private';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgFormDynamicModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

# 请在angular.json中配置ant-reset-private UI组件样式引入

```json

"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
    "output": "/assets/"
  }
],
"styles": [
  "./node_modules/ant-reset-private/ant-reset-private.less"
],
```

## <a id="used">在页面中使用</a>

```html
<fd-form-dynamic
  [options] = "formOptions"
  [layout] = "'horizontal'"
  [key]="'form1'"
  [fdButtonRender] = "buttonGroup"
  (formSubmit)="submit($event)"
>
  <ng-template #buttonGroup >
    <button nz-button [disabled]="global?.formGroups?.form1?.invalid" nzType="primary">提交2</button>
  </ng-template>
</fd-form-dynamic>

<!-- 扩展 -->
<ng-template #InputEx >
  <a (click)="add()" >添加</a>
</ng-template>
```

```javascript
import { Component, OnInit, Optional, ViewChild, ElementRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormOption, SelectOption, FormGlobalService } from 'ng-form-dynamic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  @ViewChild('InputEx') InputEx: ElementRef;
  formOptions: FormOption[];

  constructor(
    public global: FormGlobalService
  ) {

  }

  ngOnInit() {
    console.log(this.global);
    this.formOptions = [
      {
        label: '名称',
        key: 'storageName',
        type: 'input',
        placeholder: '请输入名称',
        value: [
          {value: null, disabled: false, required: true},
          [Validators.required]
        ],
        errorMsg: {
          required: '请填写内容'
        },
        extTemplate: this.InputEx
      },
      {
        label: '数量',
        key: 'storageName',
        type: 'input',
        derivativeType: 'number',
        placeholder: '数量',
        value: null,
      }
    ];
  }

  submit(res) {
    console.log(res, this.global);
    const data = res;
    this.global.checkBoxData(data, 'array');
    console.log(data);
    const datar = this.global.peersJson(data);
    console.log(datar);
  }

  add() {
    console.log('click add');
  }
}
```

## <a id="config">配置interface</a>

```javascript
export interface FormOption {
  label: string;
  key: string;
  type: 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date';
  derivativeType?: 'number' | 'button' | 'date' | 'month' | 'year' | 'week';
  dateFormat?: string;  //  仅时间date类型使用
  valueFormat?: string;  //  仅时间date类型使用
  showTime?: boolean;  //  仅时间date类型使用
  selectOptions?: SelectOption[] | Observable<SelectOption[]>;  //  radio select checkbox 类型使用
  required?: boolean;
  hide?: boolean; // 是否显示出来 用于值记录的
  value: any | [ValueOption, ValidatorFn | ValidatorFn[] | AbstractControlOptions | null];
  placeholder?: string;
  errorMsg?: {
    [key: string]: string
  };
  extTemplate?: ElementRef;
  formArray?: FormArrayItem;
  formGroup?: FormGroupItem;
}

export interface FormArrayItem {
  [key: string]: FormGroupArrOption;
}

export interface FormGroupArrOption {
  groupsArr: Array<FormOption[]>;
  key: string;
}

export interface FormGroupItem {
  [key: string]: FormGroupOption;
}

export interface FormGroupOption {
  groups: FormOption[];
  key: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
  tips?: string;
  checked?: boolean;
}

export interface ValueOption {
  value: any;
  required?: boolean;
  disabled?: boolean;
}
```

## <a id="function">包含一个全局服务</a>

是包含全局的form表单的服务``FormGroupsService``在组件中通过key传入

```javascript
public formGroups: {
  [key: string]: FormGroup
};
```

#其他方法

``FormGroupsService``服务中包含数据处理的方法目前有：

``checkBoxData`` 可以将submit数据的多选选项格式化成数据数组或以``,``分隔的字符串

``peersJson`` 可以将submit数据的JSON深度变成一层深度 如果有重复字段最深的字段会覆盖最前面的字段，请注意避免重复

## <a id="other">其他说明</a>

``options``属性为必填属性配置 其他均为选填

``layout``布局模式 ``'horizontal' | 'vertical' | 'inline'``

``key`` 早服务中记录的表单体的关键字否则不记录

``fdButtonRender`` 自定义提交按钮

``formSubmit`` 提交事件发生后返回数据的事件

``input`` 包含``derivativeType`` 只有 ``number``

``radio`` 包含``derivativeType`` 只有 ``button``

``date`` 包含``derivativeType`` 只有 ``'date' | 'month' | 'year' | 'week'``
其他类型均没有``derivativeType``属性切勿配置

``errorMsg``属性根据formgroup的错误Key作为关键字记录文字，请注意