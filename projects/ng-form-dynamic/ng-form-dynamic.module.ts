import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ant-reset-private';

import { FormDynamicComponent } from './components/form-dynamic/form-dynamic.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { FormItemDistributionComponent } from './components/form-item-distribution/form-item-distribution.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { FormDateComponent } from './components/form-date/form-date.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormArrayDistributionComponent } from './components/form-array-distribution/form-array-distribution.component';

import { FormGlobalService } from './service/form-global.service';

@NgModule({
  declarations: [
    FormDynamicComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormItemDistributionComponent,
    FormErrorComponent,
    FormDateComponent,
    FormCheckboxComponent,
    FormTextareaComponent,
    FormArrayDistributionComponent
  ],
  providers: [
    FormGlobalService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormDynamicComponent
  ]
})

export class NgFormDynamicModule {}
