import { Component, OnInit, Optional } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormOption, SelectOption, FormGlobalService } from 'ng-form-dynamic';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PageApiService } from './page-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'ng-lib-project';
  formOptions2: FormOption[] = [
    {
      label: '存储名称3122',
      key: 'storageName',
      type: 'input',
      derivativeType: 'number',
      placeholder: '请输入存储',
      value: [
        {value: null, disabled: false, required: true},
        [Validators.required]
      ],
    }
  ];
  formOptions3: FormOption[] = [
    {
      label: '存储名称asdasd',
      key: 'storageName',
      type: 'input',
      derivativeType: 'number',
      placeholder: '请输入存储',
      value: [
        {value: null, disabled: false, required: true},
        [Validators.required]
      ],
    }
  ];
  formOptions: FormOption[] = [
    {
      label: '存储类型',
      key: 'storageId',
      type: 'input',
      placeholder: '请填写存储类型',
      value: [
        { value: null, disabled: false, required: true},
        [Validators.required]
      ],
      errorMsg: {
        required: '请填写内容'
      },
      formGroup: {
        hive: {
          groups: [
            {
              label: '存储名称',
              key: 'storageName',
              type: 'input',
              placeholder: '请输入存储',
              value: [
                {value: null, disabled: false, required: true},
                [Validators.required]
              ],
              errorMsg: {
                required: '请填写内容'
              }
            },
          ],
          key: 'inpoutselect'
        }
      }
    },
    {
      label: '时间选择',
      key: 'time',
      type: 'date',
      derivativeType: 'month',
      value: [
        { value: null, disabled: false, required: false}
      ]
    },
    {
      label: '存储名称',
      key: 'storageName',
      type: 'input',
      derivativeType: 'number',
      placeholder: '请输入存储',
      value: null,
    },
    {
      label: 'textarea测试',
      key: 'storageName23',
      type: 'textarea',
      placeholder: '请输入存储',
      value: null,
    },
    {
      label: '存储类型',
      key: 'storageType',
      type: 'select',
      selectOptions: [
        {
          label: 'HIVE',
          value: 'hive',
          tips: 'hive'
        },
        {
          label: 'HDFS',
          value: 'hdfs'
        }
      ],
      placeholder: '请选择存储类型',
      value: [
        {value: 'hive', disabled: false, required: true},
        [Validators.required]
      ],
      errorMsg: {
        required: '请选择'
      },
      formGroup: {
        hive: {
          groups: [
            {
              label: '存储名称',
              key: 'storageName12',
              type: 'input',
              placeholder: '请输入存储',
              value: [
                {value: null, disabled: false, required: true},
                [Validators.required]
              ],
              errorMsg: {
                required: '请填写storageName12'
              },
            },
            {
              label: '存储类型2111',
              key: 'storageType4',
              type: 'select',
              selectOptions: this.pageApi.dictionaryModel().pipe(
                map((res: any) => {
                  const list: SelectOption[] = [];
                  res.data.forEach(es => {
                    list.push({
                      label: es.name,
                      value: es.id,
                      tips: es.title
                    });
                  });
                  return list;
                })
              ),
              placeholder: '请选择存储类型2',
              value: [
                {value: 109512, disabled: false, required: true},
                [Validators.required]
              ],
              errorMsg: {
                required: '请选择'
              }
            },
            {
              label: '是否正确',
              key: 'isOKs',
              type: 'radio',
              selectOptions: this.pageApi.dictionaryModel().pipe(
                map((res: any) => {
                  const list: SelectOption[] = [];
                  res.data.forEach(es => {
                    list.push({
                      label: es.name,
                      value: es.id,
                      tips: es.title
                    });
                  });
                  return list;
                })
              ),
              placeholder: '请选择',
              value: [
                {value: null, disabled: false, required: true},
                [Validators.required]
              ],
              errorMsg: {
                required: '请选择'
              }
            }
          ],
          key: 'hivekey'
        },
        hdfs: {
          groups: [
            {
              label: '存储名称2',
              key: 'storageName2',
              type: 'input',
              placeholder: '请输入存储',
              value: null,
            }
          ],
          key: 'hivekey'
        }
      }
    },
    {
      label: '存储类型2',
      key: 'storageType2',
      type: 'select',
      selectOptions: this.pageApi.dictionaryModel().pipe(
        map((res: any) => {
          const list: SelectOption[] = [];
          res.data.forEach(es => {
            list.push({
              label: es.name,
              value: es.id,
              tips: es.title
            });
          });
          return list;
        })
      ),
      placeholder: '请选择存储类型2',
      value: [
        {value: 109512, disabled: false, required: true},
        [Validators.required]
      ],
      errorMsg: {
        required: '请选择'
      }
    },
    {
      label: '是否正确',
      key: 'isOK',
      type: 'radio',
      derivativeType: 'button',
      selectOptions: this.pageApi.dictionaryModel().pipe(
        map((res: any) => {
          const list: SelectOption[] = [];
          res.data.forEach(es => {
            list.push({
              label: es.name,
              value: es.id,
              tips: es.title
            });
          });
          return list;
        })
      ),
      placeholder: '请选择',
      value: [
        {value: null, disabled: false, required: false}
      ],
      formGroup: {
        109511: {
          groups: [
            {
              label: 'isOk扩展',
              key: 'storageName2',
              type: 'input',
              placeholder: '请输入存储',
              value: null,
            }
          ],
          key: 'kuozhan'
        }
      },
      errorMsg: {
        required: '请选择'
      }
    },
    {
      label: '多选演示',
      key: 'isOK2',
      type: 'checkbox',
      selectOptions: [
        {
          label: 'HIVE',
          value: 'hive',
          tips: 'hive'
        },
        {
          label: 'HDFS',
          value: 'hdfs'
        }
      ],
      placeholder: '请选择',
      value: [
        {value: null, disabled: false, required: true},
        [Validators.required]
      ],
      errorMsg: {
        required: '请选择'
      }
    }
  ];

  constructor(
    public pageApi: PageApiService,
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
