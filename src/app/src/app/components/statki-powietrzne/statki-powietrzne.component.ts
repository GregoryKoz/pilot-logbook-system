import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatekPowietrzny, TypStatkuPowietrznego } from '../../models/models';
import { StatekPowietrznyService } from '../../services/statek-powietrzny.service';
import { TypStatkuPowietrznegoService } from '../../services/typ-statku-powietrznego.service';

@Component({
  selector: 'app-statki-powietrzne',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Statki powietrzne</h1>
      <button class="btn-primary" (click)="openForm()">+ Dodaj statek</button>

      <div *ngIf="showForm" class="modal-backdrop">
        <div class="modal">
          <h2>{{ editId ? 'Edytuj statek' : 'Dodaj statek' }}</h2>
          <form (ngSubmit)="save()">
            <label>Rejestracja</label>
            <input [(ngModel)]="form.rejestracja" name="rejestracja" required />
            <label>Typ statku</label>
            <select [(ngModel)]="form.typStatkuPowietrznegoId" name="typId">
              <option [ngValue]="undefined">-- brak --</option>
              <option *ngFor="let t of typy" [ngValue]="t.id">{{ t.producent }} {{ t.model }}</option>
            </select>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Zapisz</button>
              <button type="button" class="btn-secondary" (click)="closeForm()">Anuluj</button>
            </div>
          </form>
        </div>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Rejestracja</th><th>Typ</th><th>Akcje</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of statki">
            <td>{{ s.id }}</td>
            <td>{{ s.rejestracja }}</td>
            <td>{{ s.typStatkuPowietrznegoProducent }} {{ s.typStatkuPowietrznegoModel }}</td>
            <td>
              <button class="btn-edit" (click)="edit(s)">Edytuj</button>
              <button class="btn-delete" (click)="delete(s.id!)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class StatkiPowietrzneComponent implements OnInit {
  statki: StatekPowietrzny[] = [];
  typy: TypStatkuPowietrznego[] = [];
  showForm = false;
  editId?: number;
  form: StatekPowietrzny = this.emptyForm();

  constructor(private service: StatekPowietrznyService, private typService: TypStatkuPowietrznegoService) {}
  ngOnInit() { this.load(); this.typService.getAll().subscribe(d => this.typy = d); }
  load() { this.service.getAll().subscribe(d => this.statki = d); }
  openForm() { this.form = this.emptyForm(); this.editId = undefined; this.showForm = true; }
  edit(s: StatekPowietrzny) { this.editId = s.id; this.form = { ...s }; this.showForm = true; }
  save() {
    const obs = this.editId ? this.service.update(this.editId, this.form) : this.service.create(this.form);
    obs.subscribe(() => { this.load(); this.closeForm(); });
  }
  delete(id: number) { if (confirm('Usunąć statek?')) this.service.delete(id).subscribe(() => this.load()); }
  closeForm() { this.showForm = false; }
  private emptyForm(): StatekPowietrzny { return { rejestracja: '' }; }
}
