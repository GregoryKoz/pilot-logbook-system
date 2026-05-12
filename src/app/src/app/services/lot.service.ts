import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lot, NalotSumaryczny } from '../models/models';

@Injectable({ providedIn: 'root' })
export class LotService {
  private url = 'http://localhost:8080/api/loty';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Lot[]> { return this.http.get<Lot[]>(this.url); }
  getById(id: number): Observable<Lot> { return this.http.get<Lot>(`${this.url}/${id}`); }
  getByPilot(pilotId: number): Observable<Lot[]> { return this.http.get<Lot[]>(`${this.url}/pilot/${pilotId}`); }
  getNalotSumaryczny(): Observable<NalotSumaryczny[]> { return this.http.get<NalotSumaryczny[]>(`${this.url}/nalot-sumaryczny`); }
  create(l: Lot): Observable<Lot> { return this.http.post<Lot>(this.url, l); }
  update(id: number, l: Lot): Observable<Lot> { return this.http.put<Lot>(`${this.url}/${id}`, l); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
