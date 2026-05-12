import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Uprawnienie } from '../../models/models';
import { UprawnienieService } from '../../services/uprawnienie.service';

@Component({
  selector: 'app-uprawnienia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Uprawnienia</h1>
      <button class="btn-primary" (click)="openForm()">+ Dodaj uprawnienie</button>

      <div *ngIf="showForm" class="modal-backdrop">
        <div class="modal">
          <h2>{{ editId ? 'Edytuj' : 'Dodaj uprawnienie' }}</h2>
          <form (ngSubmit)="save()">
            <label>Nazwa</label>
            <input [(ngModel)]="form.nazwa" name="nazwa" required />
            <label>Opis</label>
            <textarea [(ngModel)]="form.opis" name="opis" rows="3"></textarea>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Zapisz</button>
              <button type="button" class="btn-secondary" (click)="closeForm()">Anuluj</button>
            </div>
          </form>
        </div>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Nazwa</th><th>Opis</th><th>Akcje</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let u of uprawnienia">
            <td>{{ u.id }}</td><td>{{ u.nazwa }}</td><td>{{ u.opis }}</td>
            <td>
              <button class="btn-edit" (click)="edit(u)">Edytuj</button>
              <button class="btn-delete" (click)="delete(u.id!)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class UprawieniaComponent implements OnInit {
  uprawnienia: Uprawnienie[] = [];
  showForm = false;
  editId?: number;
  form: Uprawnienie = this.emptyForm();

  constructor(private service: UprawnienieService) {}
  ngOnInit() { this.load(); }
  load() { this.service.getAll().subscribe(d => this.uprawnienia = d); }
  openForm() { this.form = this.emptyForm(); this.editId = undefined; this.showForm = true; }
  edit(u: Uprawnienie) { this.editId = u.id; this.form = { ...u }; this.showForm = true; }
  save() {
    const obs = this.editId ? this.service.update(this.editId, this.form) : this.service.create(this.form);
    obs.subscribe(() => { this.load(); this.closeForm(); });
  }
  delete(id: number) { if (confirm('Usunąć uprawnienie?')) this.service.delete(id).subscribe(() => this.load()); }
  closeForm() { this.showForm = false; }
  private emptyForm(): Uprawnienie { return { nazwa: '', opis: '' }; }
}
