import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pilot } from '../../models/models';
import { PilotService } from '../../services/pilot.service';

@Component({
  selector: 'app-piloci',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Piloci</h1>
      <button class="btn-primary" (click)="openForm()">+ Dodaj pilota</button>

      <div *ngIf="showForm" class="modal-backdrop">
        <div class="modal">
          <h2>{{ editId ? 'Edytuj pilota' : 'Dodaj pilota' }}</h2>
          <form (ngSubmit)="save()">
            <label>Imię</label>
            <input [(ngModel)]="form.imie" name="imie" required />
            <label>Nazwisko</label>
            <input [(ngModel)]="form.nazwisko" name="nazwisko" required />
            <label>Numer licencji</label>
            <input [(ngModel)]="form.numerLicencji" name="numerLicencji" required />
            <label>Data urodzenia</label>
            <input type="date" [(ngModel)]="form.dataUrodzenia" name="dataUrodzenia" />
            <label>Narodowość</label>
            <input [(ngModel)]="form.narodowosc" name="narodowosc" />
            <div class="form-actions">
              <button type="submit" class="btn-primary">Zapisz</button>
              <button type="button" class="btn-secondary" (click)="closeForm()">Anuluj</button>
            </div>
          </form>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Imię</th><th>Nazwisko</th><th>Licencja</th><th>Data ur.</th><th>Narodowość</th><th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of pilots">
            <td>{{ p.id }}</td>
            <td>{{ p.imie }}</td>
            <td>{{ p.nazwisko }}</td>
            <td>{{ p.numerLicencji }}</td>
            <td>{{ p.dataUrodzenia }}</td>
            <td>{{ p.narodowosc }}</td>
            <td>
              <button class="btn-edit" (click)="edit(p)">Edytuj</button>
              <button class="btn-delete" (click)="delete(p.id!)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class PilocyComponent implements OnInit {
  pilots: Pilot[] = [];
  showForm = false;
  editId?: number;
  form: Pilot = this.emptyForm();

  constructor(private service: PilotService) {}

  ngOnInit() { this.load(); }

  load() { this.service.getAll().subscribe(d => this.pilots = d); }

  openForm() { this.form = this.emptyForm(); this.editId = undefined; this.showForm = true; }

  edit(p: Pilot) {
    this.editId = p.id;
    this.form = { ...p };
    this.showForm = true;
  }

  save() {
    const obs = this.editId
      ? this.service.update(this.editId, this.form)
      : this.service.create(this.form);
    obs.subscribe(() => { this.load(); this.closeForm(); });
  }

  delete(id: number) {
    if (confirm('Usunąć pilota?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }

  closeForm() { this.showForm = false; }

  private emptyForm(): Pilot {
    return { imie: '', nazwisko: '', numerLicencji: '', dataUrodzenia: '', narodowosc: '' };
  }
}
