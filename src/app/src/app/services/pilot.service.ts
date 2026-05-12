import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PilotService {
  private url = 'http://localhost:8080/api/pilots';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Pilot[]> { return this.http.get<Pilot[]>(this.url); }
  getById(id: number): Observable<Pilot> { return this.http.get<Pilot>(`${this.url}/${id}`); }
  create(p: Pilot): Observable<Pilot> { return this.http.post<Pilot>(this.url, p); }
  update(id: number, p: Pilot): Observable<Pilot> { return this.http.put<Pilot>(`${this.url}/${id}`, p); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
