import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ant-reset-private';

import { FormGlobalService } from './service';
import {
  FormDynamicComponent,
  FormInputComponent,
  FormSelectComponent,
  FormRadioComponent,
  FormItemDistributionComponent,
  FormErrorComponent,
  FormDateComponent,
  FormCheckboxComponent,
  FormTextareaComponent,
  FormArrayDistributionComponent,
} from './components';

export * from './interface';
export { FormGlobalService } from './service/form-global.service';

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
    NgZorroAntdModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormDynamicComponent
  ]
})
export class NgFormDynamicModule {}
