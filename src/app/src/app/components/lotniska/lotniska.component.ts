import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lotnisko } from '../../models/models';
import { LotniskoService } from '../../services/lotnisko.service';

@Component({
  selector: 'app-lotniska',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Lotniska</h1>
      <button class="btn-primary" (click)="openForm()">+ Dodaj lotnisko</button>

      <div *ngIf="showForm" class="modal-backdrop">
        <div class="modal">
          <h2>{{ editId ? 'Edytuj lotnisko' : 'Dodaj lotnisko' }}</h2>
          <form (ngSubmit)="save()">
            <label>Kod ICAO</label>
            <input [(ngModel)]="form.kodIcao" name="kodIcao" required maxlength="4" style="text-transform:uppercase" />
            <label>Nazwa</label>
            <input [(ngModel)]="form.nazwa" name="nazwa" required />
            <label>Miasto</label>
            <input [(ngModel)]="form.miasto" name="miasto" />
            <label>Kraj</label>
            <input [(ngModel)]="form.kraj" name="kraj" />
            <div class="form-actions">
              <button type="submit" class="btn-primary">Zapisz</button>
              <button type="button" class="btn-secondary" (click)="closeForm()">Anuluj</button>
            </div>
          </form>
        </div>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Kod ICAO</th><th>Nazwa</th><th>Miasto</th><th>Kraj</th><th>Akcje</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let l of lotniska">
            <td>{{ l.id }}</td>
            <td>{{ l.kodIcao }}</td>
            <td>{{ l.nazwa }}</td>
            <td>{{ l.miasto }}</td>
            <td>{{ l.kraj }}</td>
            <td>
              <button class="btn-edit" (click)="edit(l)">Edytuj</button>
              <button class="btn-delete" (click)="delete(l.id!)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class LotniskaComponent implements OnInit {
  lotniska: Lotnisko[] = [];
  showForm = false;
  editId?: number;
  form: Lotnisko = this.emptyForm();

  constructor(private service: LotniskoService) {}
  ngOnInit() { this.load(); }
  load() { this.service.getAll().subscribe(d => this.lotniska = d); }
  openForm() { this.form = this.emptyForm(); this.editId = undefined; this.showForm = true; }
  edit(l: Lotnisko) { this.editId = l.id; this.form = { ...l }; this.showForm = true; }
  save() {
    const obs = this.editId ? this.service.update(this.editId, this.form) : this.service.create(this.form);
    obs.subscribe(() => { this.load(); this.closeForm(); });
  }
  delete(id: number) { if (confirm('Usunąć lotnisko?')) this.service.delete(id).subscribe(() => this.load()); }
  closeForm() { this.showForm = false; }
  private emptyForm(): Lotnisko { return { kodIcao: '', nazwa: '', miasto: '', kraj: '' }; }
}
