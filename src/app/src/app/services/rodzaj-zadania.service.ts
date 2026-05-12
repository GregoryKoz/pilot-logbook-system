import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RodzajZadania } from '../models/models';

@Injectable({ providedIn: 'root' })
export class RodzajZadaniaService {
  private url = 'http://localhost:8080/api/rodzaje-zadan';
  constructor(private http: HttpClient) {}
  getAll(): Observable<RodzajZadania[]> { return this.http.get<RodzajZadania[]>(this.url); }
  getById(id: number): Observable<RodzajZadania> { return this.http.get<RodzajZadania>(`${this.url}/${id}`); }
  create(r: RodzajZadania): Observable<RodzajZadania> { return this.http.post<RodzajZadania>(this.url, r); }
  update(id: number, r: RodzajZadania): Observable<RodzajZadania> { return this.http.put<RodzajZadania>(`${this.url}/${id}`, r); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
