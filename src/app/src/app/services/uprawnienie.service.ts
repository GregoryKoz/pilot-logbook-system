import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Uprawnienie } from '../models/models';

@Injectable({ providedIn: 'root' })
export class UprawnienieService {
  private url = 'http://localhost:8080/api/uprawnienia';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Uprawnienie[]> { return this.http.get<Uprawnienie[]>(this.url); }
  getById(id: number): Observable<Uprawnienie> { return this.http.get<Uprawnienie>(`${this.url}/${id}`); }
  create(u: Uprawnienie): Observable<Uprawnienie> { return this.http.post<Uprawnienie>(this.url, u); }
  update(id: number, u: Uprawnienie): Observable<Uprawnienie> { return this.http.put<Uprawnienie>(`${this.url}/${id}`, u); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
