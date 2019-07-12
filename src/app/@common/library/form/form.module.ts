import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDynamicComponent } from './form-dynamic/form-dynamic.component';

import { NgZorroAntdModule } from 'ant-reset-private';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormRadioComponent } from './form-radio/form-radio.component';
import { FormItemDistributionComponent } from './form-item-distribution/form-item-distribution.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { FormItemArrayDistributionComponent } from './form-item-array-distribution/form-item-array-distribution.component';
import { FormDateComponent } from './form-date/form-date.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormTextareaComponent } from './form-textarea/form-textarea.component';

@NgModule({
  declarations: [
    FormDynamicComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormItemDistributionComponent,
    FormErrorComponent,
    FormItemArrayDistributionComponent,
    FormDateComponent,
    FormCheckboxComponent,
    FormTextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    FormDynamicComponent
  ]
})
export class FormModule { }
