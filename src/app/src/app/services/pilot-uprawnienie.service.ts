import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PilotUprawnienie } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PilotUprawnienieService {
  private url = 'http://localhost:8080/api/pilot-uprawnienia';
  constructor(private http: HttpClient) {}
  getAll(): Observable<PilotUprawnienie[]> { return this.http.get<PilotUprawnienie[]>(this.url); }
  getById(id: number): Observable<PilotUprawnienie> { return this.http.get<PilotUprawnienie>(`${this.url}/${id}`); }
  getByPilot(pilotId: number): Observable<PilotUprawnienie[]> { return this.http.get<PilotUprawnienie[]>(`${this.url}/pilot/${pilotId}`); }
  create(p: PilotUprawnienie): Observable<PilotUprawnienie> { return this.http.post<PilotUprawnienie>(this.url, p); }
  update(id: number, p: PilotUprawnienie): Observable<PilotUprawnienie> { return this.http.put<PilotUprawnienie>(`${this.url}/${id}`, p); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}
