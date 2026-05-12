import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PilotUprawnienie, Pilot, Uprawnienie } from '../../models/models';
import { PilotUprawnienieService } from '../../services/pilot-uprawnienie.service';
import { PilotService } from '../../services/pilot.service';
import { UprawnienieService } from '../../services/uprawnienie.service';

@Component({
  selector: 'app-pilot-uprawnienia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Uprawnienia pilotów</h1>
      <button class="btn-primary" (click)="openForm()">+ Dodaj</button>

      <div *ngIf="showForm" class="modal-backdrop">
        <div class="modal">
          <h2>{{ editId ? 'Edytuj' : 'Dodaj uprawnienie pilota' }}</h2>
          <form (ngSubmit)="save()">
            <label>Pilot</label>
            <select [(ngModel)]="form.pilotId" name="pilotId" required>
              <option *ngFor="let p of pilots" [ngValue]="p.id">{{ p.imie }} {{ p.nazwisko }}</option>
            </select>
            <label>Uprawnienie</label>
            <select [(ngModel)]="form.uprawnienieId" name="uprawnienieId" required>
              <option *ngFor="let u of uprawnienia" [ngValue]="u.id">{{ u.nazwa }}</option>
            </select>
            <label>Data wydania</label>
            <input type="date" [(ngModel)]="form.dataWydania" name="dataWydania" required />
            <label>Data ważności</label>
            <input type="date" [(ngModel)]="form.dataWaznosci" name="dataWaznosci" required />
            <div class="form-actions">
              <button type="submit" class="btn-primary">Zapisz</button>
              <button type="button" class="btn-secondary" (click)="closeForm()">Anuluj</button>
            </div>
          </form>
        </div>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Pilot</th><th>Uprawnienie</th><th>Data wydania</th><th>Data ważności</th><th>Status</th><th>Akcje</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let pu of pilotUprawnienia" [class.expiring]="pu.wygasajace">
            <td>{{ pu.id }}</td>
            <td>{{ pu.pilotImie }} {{ pu.pilotNazwisko }}</td>
            <td>{{ pu.uprawnienieNazwa }}</td>
            <td>{{ pu.dataWydania }}</td>
            <td>{{ pu.dataWaznosci }}</td>
            <td><span [class]="pu.wygasajace ? 'badge-warning' : 'badge-ok'">{{ pu.wygasajace ? 'Wygasające' : 'Aktywne' }}</span></td>
            <td>
              <button class="btn-edit" (click)="edit(pu)">Edytuj</button>
              <button class="btn-delete" (click)="delete(pu.id!)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class PilotUprawieniaComponent implements OnInit {
  pilotUprawnienia: PilotUprawnienie[] = [];
  pilots: Pilot[] = [];
  uprawnienia: Uprawnienie[] = [];
  showForm = false;
  editId?: number;
  form: PilotUprawnienie = this.emptyForm();

  constructor(
    private service: PilotUprawnienieService,
    private pilotService: PilotService,
    private uprawnienieService: UprawnienieService
  ) {}

  ngOnInit() {
    this.load();
    this.pilotService.getAll().subscribe(d => this.pilots = d);
    this.uprawnienieService.getAll().subscribe(d => this.uprawnienia = d);
  }

  load() { this.service.getAll().subscribe(d => this.pilotUprawnienia = d); }
  openForm() { this.form = this.emptyForm(); this.editId = undefined; this.showForm = true; }
  edit(pu: PilotUprawnienie) { this.editId = pu.id; this.form = { ...pu }; this.showForm = true; }
  save() {
    const obs = this.editId ? this.service.update(this.editId, this.form) : this.service.create(this.form);
    obs.subscribe(() => { this.load(); this.closeForm(); });
  }
  delete(id: number) { if (confirm('Usunąć?')) this.service.delete(id).subscribe(() => this.load()); }
  closeForm() { this.showForm = false; }
  private emptyForm(): PilotUprawnienie { return { dataWydania: '', dataWaznosci: '', pilotId: 0, uprawnienieId: 0 }; }
}
