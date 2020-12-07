import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.api';

@Injectable()
export class CidadeService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
 });
  options = {
    headers: this.headers
 }

  constructor(private http: HttpClient){}

  getCidadesPorEstado(idEstado: number): Observable<any> {
    return this.http.get(`${BASE_URL}/cidades/estado/${idEstado}`)
  }

  salvarCidade(cidades: Array<any>): Observable<any> {
    console.log(cidades)
    const headers = new HttpHeaders()
    headers.append('Content-Type', 'application/json')
    return this.http.post(`${BASE_URL}/cidades`, JSON.stringify(cidades),
    this.options)
  }

  removerCidade(id: number): Observable<any> {
      return this.http.delete(`${BASE_URL}/cidades/${id}`)
  }

}
