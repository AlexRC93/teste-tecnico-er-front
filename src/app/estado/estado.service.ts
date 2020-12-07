import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.api';

@Injectable()
export class EstadoService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
 });
  options = {
    headers: this.headers
 }

  constructor(private http: HttpClient){}

  getEstados(): Observable<any> {
    return this.http.get(`${BASE_URL}/estados`)
  }

}
