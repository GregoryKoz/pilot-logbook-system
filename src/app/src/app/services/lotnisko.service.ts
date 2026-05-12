import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lotnisko } from '../models/models';

@Injectable({ providedIn: 'root' })
export class LotniskoService {
  private url = 'http://localhost:8080/api/lotniska';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Lotnisko[]> { return this.http.get<Lotnisko[]>(this.url); }
  getById(id: number): Observable<Lotnisko> { return this.http.get<Lotnisko>(`${this.url}/${id}`); }
  create(l: Lotnisko): Observable<Lotnisko> { return this.http.post<Lotnisko>(this.url, l); }
  update(id: number, l: Lotnisko): Observable<Lotnisko> { return this.http.put<Lotnisko>(`${this.url}/${id}`, l); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
