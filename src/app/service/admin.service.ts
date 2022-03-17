import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  urlPrefix: string = 'http://localhost:46194/api/';
  constructor(private http: HttpClient) { }

  getAll<T>(url: string, options?: any): Observable<T[]> {

    var headers = this.setHeaders();
    
    return this.http
      .get(this.urlPrefix + url, { headers: headers }).pipe(
      map((response: T[]) => {
        return response;
      }));
  }

  get<T>(url: string, id: number|string = null): Observable<T> {
    var headers = this.setHeaders();


    return this.http
      .get(this.urlPrefix + url+'?Id='+id, { headers: headers }).pipe(
      map((response: T) => {
        return response;
      }));
  }

  post(url: string, data?: any): Observable<any> {

    var headers = this.setHeaders();
    let body = JSON.stringify(data);
    return this.http.post(this.urlPrefix + url, body, { headers: headers }).pipe(map((response: any) => {
      return response;
    }));
  }


 

  delete(url: string, id: number | string): Observable<any> {

    var headers = this.setHeaders();


    return this.http.delete(this.urlPrefix + url + "?Id="+ id, { headers: headers });
  }

  setHeaders(){
    var headers = new HttpHeaders();

      headers = headers.set('Content-Type', 'application/json');

      headers = headers.set('authorization', "Bearer " + "token");

     return headers;
  }
  getFile(url: string, id: number | string): Observable<any> {

    var headers = new HttpHeaders();

      headers = headers.set('Content-Type', 'arrayBuffer');

      headers = headers.set('authorization', "Bearer " + "token");


    return this.http.get(this.urlPrefix + url, { headers: headers });
  }

  // downloadFileWithGet<T>(url: string, headerValue: any): Observable<T> {
  //   headers = this.appendIntoHeader(headers, headerValue);
  //   const httpOptions = {
  //     headers: headers,
  //     responseType: 'blob' as 'json',
  //     Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   };
  //   return this.http
  //     .get(url, httpOptions)
  //     .map((response: T) => {
  //       this.spinnerService.hide();
  //       return response;
  //     });
  // }

  // downloadFileWithPost<T>(url: string, data: any, headerValue: any): Observable<T> {
  //   headers = this.appendIntoHeader(headers, headerValue);
  //   const httpOptions = {
  //     headers: headers,
  //     responseType: 'blob' as 'json',
  //     Accept: 'text/csv;charset=utf-8;',
  //   };
  //   return this.http
  //     .post(url, data, httpOptions)
  //     .map((response: T) => {
  //       this.spinnerService.hide();
  //       return response;
  //     });
  // }
}
