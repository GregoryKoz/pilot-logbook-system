import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypStatkuPowietrznego } from '../../models/models';
import { TypStatkuPowietrznegoService } from '../../services/typ-statku-powietrznego.service';

@Component({
  selector: 'app-typy-statku',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Typy statku powietrznego</h1>
      <button class="btn-primary" (click)="openForm()">+ Dodaj typ</button>

      <div *ngIf="showForm" class="modal-backdrop">
        <div class="modal">
          <h2>{{ editId ? 'Edytuj typ' : 'Dodaj typ' }}</h2>
          <form (ngSubmit)="save()">
            <label>Producent</label>
            <input [(ngModel)]="form.producent" name="producent" required />
            <label>Model</label>
            <input [(ngModel)]="form.model" name="model" required />
            <label>Kategoria</label>
            <input [(ngModel)]="form.kategoria" name="kategoria" />
            <div class="form-actions">
              <button type="submit" class="btn-primary">Zapisz</button>
              <button type="button" class="btn-secondary" (click)="closeForm()">Anuluj</button>
            </div>
          </form>
        </div>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Producent</th><th>Model</th><th>Kategoria</th><th>Akcje</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let t of typy">
            <td>{{ t.id }}</td><td>{{ t.producent }}</td><td>{{ t.model }}</td><td>{{ t.kategoria }}</td>
            <td>
              <button class="btn-edit" (click)="edit(t)">Edytuj</button>
              <button class="btn-delete" (click)="delete(t.id!)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TypyStatkuComponent implements OnInit {
  typy: TypStatkuPowietrznego[] = [];
  showForm = false;
  editId?: number;
  form: TypStatkuPowietrznego = this.emptyForm();

  constructor(private service: TypStatkuPowietrznegoService) {}
  ngOnInit() { this.load(); }
  load() { this.service.getAll().subscribe(d => this.typy = d); }
  openForm() { this.form = this.emptyForm(); this.editId = undefined; this.showForm = true; }
  edit(t: TypStatkuPowietrznego) { this.editId = t.id; this.form = { ...t }; this.showForm = true; }
  save() {
    const obs = this.editId ? this.service.update(this.editId, this.form) : this.service.create(this.form);
    obs.subscribe(() => { this.load(); this.closeForm(); });
  }
  delete(id: number) { if (confirm('Usunąć typ?')) this.service.delete(id).subscribe(() => this.load()); }
  closeForm() { this.showForm = false; }
  private emptyForm(): TypStatkuPowietrznego { return { producent: '', model: '', kategoria: '' }; }
}
