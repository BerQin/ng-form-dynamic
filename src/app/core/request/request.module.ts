import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestService } from './service/request.service';
import { API_URL_TOKEN } from './request.token';

@NgModule()
export class RequestModule {
  public static forRoot(apiUrl?: string): ModuleWithProviders {
    return {
      ngModule: RequestModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: RequestService, multi: true },
        { provide: API_URL_TOKEN, useValue: apiUrl }
      ]
    };
  }
}
