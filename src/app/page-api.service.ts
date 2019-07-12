import { Injectable } from '@angular/core';
import { GET, POST, GET_DATA } from '@common/function/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageApiService {
  constructor(private http: HttpClient) {
  }

  @GET('/user/current')
  public getUserCurrent(param?: any): Observable<any> {
    return null;
  }

  @POST('/user/userInfo')
  public getUserInfo(param?: any): Observable<any> {
    return null;
  }

  @GET('/user/logout')
  public getLogout(param?: any): Observable<any> {
    return null;
  }

  @POST('/report-category/get-view')
  dictionaryModel(): Observable<any> {
    return null;
  }
}
