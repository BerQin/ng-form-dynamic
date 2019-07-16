
# ng-form-dynamic
> angular7+以上的版本可以使用；进行动态表单配置生成满足通常情况下的使用需求

## 更新日志


```
v1.0.0
支持formgroup扩展
支持'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date'
支持扩展类型 'number' | 'button' | 'date' | 'month' | 'year' | 'week'详情请查看最下方的其他说明
支持自定义提交按钮
释放全局的服务记录表单主体FormGroup,需要在组件传入key
支持校验和错误提示


v1.1.0
添加formArray扩展生成配置
确认只支持二级扩展
```


## 1、开始使用
## <a name="install">安装</a>

```
npm i ant-reset-private
npm i ng-form-dynamic
```

## <a name="use">使用</a>

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

## <a name="used">在页面中使用</a>

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
```

```javascript
import { Component, OnInit, Optional } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormOption, SelectOption, FormGlobalService } from 'ng-form-dynamic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  formOptions3: FormOption[] = [
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
  constructor(
    public global: FormGlobalService
  ) {

  }

  ngOnInit() {
    console.log(this.global);
  }

  submit(res) {
    console.log(res, this.global);
  }
}
```

## <a name="config">配置interface</a>

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

#包含一个全局服务

是包含全局的form表单的服务``FormGroupsService``在组件中通过key传入

#其他说明

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