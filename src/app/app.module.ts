import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgFormDynamicModule } from 'ng-form-dynamic';
import { NZ_I18N, zh_CN, NZ_NOTIFICATION_CONFIG, NgZorroAntdModule } from 'ant-reset-private';
import { registerLocaleData } from '@angular/common';
import { RequestModule } from '@core/request/request.module';
import zh from '@angular/common/locales/zh';
import { environment } from '@environments/environment';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RequestModule.forRoot(environment.apiUrl),
    NgZorroAntdModule,
    NgFormDynamicModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
