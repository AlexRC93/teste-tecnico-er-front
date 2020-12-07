import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CotacaoDolarService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
 });
  options = {
    headers: this.headers
 }

  constructor(private http: HttpClient){}

  consultarCotacaoDolar(): Observable<any> {
    return this.http.get('https://economia.awesomeapi.com.br/json/USD-BRL')
  }

}
