import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypStatkuPowietrznego } from '../models/models';

@Injectable({ providedIn: 'root' })
export class TypStatkuPowietrznegoService {
  private url = 'http://localhost:8080/api/typy-statku-powietrznego';
  constructor(private http: HttpClient) {}
  getAll(): Observable<TypStatkuPowietrznego[]> { return this.http.get<TypStatkuPowietrznego[]>(this.url); }
  getById(id: number): Observable<TypStatkuPowietrznego> { return this.http.get<TypStatkuPowietrznego>(`${this.url}/${id}`); }
  create(t: TypStatkuPowietrznego): Observable<TypStatkuPowietrznego> { return this.http.post<TypStatkuPowietrznego>(this.url, t); }
  update(id: number, t: TypStatkuPowietrznego): Observable<TypStatkuPowietrznego> { return this.http.put<TypStatkuPowietrznego>(`${this.url}/${id}`, t); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
