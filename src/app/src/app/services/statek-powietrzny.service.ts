import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatekPowietrzny } from '../models/models';

@Injectable({ providedIn: 'root' })
export class StatekPowietrznyService {
  private url = 'http://localhost:8080/api/statki-powietrzne';
  constructor(private http: HttpClient) {}
  getAll(): Observable<StatekPowietrzny[]> { return this.http.get<StatekPowietrzny[]>(this.url); }
  getById(id: number): Observable<StatekPowietrzny> { return this.http.get<StatekPowietrzny>(`${this.url}/${id}`); }
  create(s: StatekPowietrzny): Observable<StatekPowietrzny> { return this.http.post<StatekPowietrzny>(this.url, s); }
  update(id: number, s: StatekPowietrzny): Observable<StatekPowietrzny> { return this.http.put<StatekPowietrzny>(`${this.url}/${id}`, s); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
