import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormOption, FormGroupItem, SelectOption, FormArrayItem } from '../../interface/form-option.interface';
import { FormGroupsService } from '../../service/form-groups.service';
import { FormGlobalService } from '../../service/form-global.service';

@Component({
  selector: 'fd-form-dynamic',
  templateUrl: './form-dynamic.component.html',
  styleUrls: ['./form-dynamic.component.less'],
  providers: [
    FormGroupsService
  ]
})
export class FormDynamicComponent implements OnInit, OnDestroy {

  @Input() set options(value: FormOption[]) {
    this.groupService.options = value;
  }

  get options(): FormOption[] {
    return this.groupService.options;
  }

  @Input() key: string = null;

  @Input() set layout(value: 'horizontal' | 'vertical' | 'inline') {
    this.groupService._layout = value || 'horizontal';
  }

  get layout(): 'horizontal' | 'vertical' | 'inline' {
    return this.groupService._layout;
  }

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  @Input() fdButtonRender: any;

  private listenKeys: string[] = [];
  private defaultValue: {
    [key: string]: any;
  } = {};

  constructor(
    private fb: FormBuilder,
    public groupService: FormGroupsService,
    private globalService: FormGlobalService
  ) {
  }

  ngOnInit() {
    this.initFormGroup();
    this.initListen();
    // 初始化触发
    this.groupService.FormGroup.reset(this.defaultValue);
    // 表单存放暴露
    if (this.key) {
      this.globalService.formGroups[this.key] = this.groupService.FormGroup;
    }
  }

  initFormGroup(): void {
    this.options.forEach((item: FormOption, index) => {
      this.groupService.FormGroupOption[item.key] = this.initItemConfig(item, true);
    });
    this.groupService.FormGroup = this.fb.group(this.groupService.FormGroupOption);
  }

  initListen(): void {
    this.listenKeys.forEach((item: string) => {
      this.groupService.listenComponetDestroyeds$[item] = new Subject<any>();
      this.groupService.FormGroup.get(item).valueChanges.pipe(
        takeUntil(this.groupService.listenComponetDestroyeds$[item])
      ).subscribe((value: any) => {

        // 清理创建的内容
        this.clearGroupForm(this.groupService.groupOptions[item].formGroup);
        this.clearArrGroupForm(this.groupService.groupOptions[item].formArray);

        if (value !== null && value !== undefined) {
          const groupOption: FormGroupItem = this.groupService.groupOptions[item].formGroup;
          if (groupOption && groupOption[value]) {
              this.groupService.FormGroup.addControl(groupOption[value].key, this.creatFormGroup(groupOption[value].groups));
          }

          const groupArrayOption = this.groupService.groupOptions[item].formArray;
          if (groupArrayOption && groupArrayOption[value]) {
            const arrGroup = this.creatFormArrayGroup(groupArrayOption[value].groupsArr);
            this.groupService.FormGroup.addControl(groupArrayOption[value].key, arrGroup);
          }
        }
      });
    });
  }

  clearGroupForm(item: FormGroupItem): void {
    for (const key in item) {
      if (key) {
        this.groupService.FormGroup.removeControl(item[key].key);
      }
    }
  }

  clearArrGroupForm(item: FormArrayItem): void {
    for (const key in item) {
      if (key) {
        this.groupService.FormGroup.removeControl(item[key].key);
      }
    }
  }

  creatFormArrayGroup(arr: Array<FormOption[]>): FormArray {
    const arrGroup: FormGroup[] = [];
    if (arr && arr.length) {
      arr.forEach((item) => {
        const formgroup = this.creatFormGroup(item);
        arrGroup.push(formgroup);
      });
    }
    return this.fb.array(arrGroup);
  }

  creatFormGroup(options: FormOption[]): FormGroup {
    const formoptions = {};

    options.forEach((item: FormOption) => {
      formoptions[item.key] =  this.initItemConfig(item);
    });

    return this.fb.group(formoptions);
  }

  initItemConfig(item: FormOption, isfirst?: boolean): any {
    const result: any = this.creatValueConfig(item);
    if (isfirst) {
      this.groupService.groupOptions[item.key] = item;

      if (item.formGroup || item.formArray) {
        if (this.listenKeys.indexOf(item.key) === -1) {
          this.listenKeys.push(item.key);
        }
      }
    }
    return result;
  }

  creatValueConfig(item: FormOption): any {
    let valueOption: any = null;
    if (item.value instanceof Array && typeof item.value[0] === 'object') {
      let valueR: any = null;
      if (item.type === 'checkbox') {
        valueR = this.initcheckBox(item);
      } else {
        valueR = item.value[0].value;
      }
      valueOption = [
        {
          value: valueR,
          disabled: item.value[0].disabled || false
        },
        item.value[1]
      ];
      item.required = item.value[0].required || false;
      this.defaultValue[item.key] = valueR;
    } else {
      let value: any = null;
      if (item.type === 'checkbox') {
        value = this.initcheckBox(item, 'out');
      } else {
        value = item.value;
      }

      valueOption = value;
      item.required = false;
      this.defaultValue[item.key] = value;
    }
    return valueOption;
  }

  initcheckBox(item: FormOption, type?: 'out'): SelectOption[] {
    let result: SelectOption[] = [];
    const body = type === 'out' ? item : item.value[0];
    if (item.selectOptions instanceof Array) {
      if (body.value && body.value.length) {
        item.selectOptions.forEach(one => {
          if ( body.value.indexOf(one.value) !== -1 ) {
            one.checked = true;
          } else {
            one.checked = false;
          }
        });
      }
      result = item.selectOptions;
    } else {
    }

    return result;
  }

  submitForm(): void {
    this.formSubmit.emit(this.groupService.FormGroup.getRawValue());
  }

  ngOnDestroy(): void {
    if (this.key && this.globalService.formGroups[this.key]) {
      delete this.globalService.formGroups[this.key];
    }
  }
}
