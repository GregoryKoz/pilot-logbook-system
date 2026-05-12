import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RodzajZadania } from '../../models/models';
import { RodzajZadaniaService } from '../../services/rodzaj-zadania.service';

@Component({
  selector: 'app-rodzaje-zadan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Rodzaje zadań</h1>
      <button class="btn-primary" (click)="openForm()">+ Dodaj rodzaj</button>

      <div *ngIf="showForm" class="modal-backdrop">
        <div class="modal">
          <h2>{{ editId ? 'Edytuj' : 'Dodaj rodzaj zadania' }}</h2>
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
          <tr *ngFor="let r of rodzaje">
            <td>{{ r.id }}</td><td>{{ r.nazwa }}</td><td>{{ r.opis }}</td>
            <td>
              <button class="btn-edit" (click)="edit(r)">Edytuj</button>
              <button class="btn-delete" (click)="delete(r.id!)">Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class RodzajeZadanComponent implements OnInit {
  rodzaje: RodzajZadania[] = [];
  showForm = false;
  editId?: number;
  form: RodzajZadania = this.emptyForm();

  constructor(private service: RodzajZadaniaService) {}
  ngOnInit() { this.load(); }
  load() { this.service.getAll().subscribe(d => this.rodzaje = d); }
  openForm() { this.form = this.emptyForm(); this.editId = undefined; this.showForm = true; }
  edit(r: RodzajZadania) { this.editId = r.id; this.form = { ...r }; this.showForm = true; }
  save() {
    const obs = this.editId ? this.service.update(this.editId, this.form) : this.service.create(this.form);
    obs.subscribe(() => { this.load(); this.closeForm(); });
  }
  delete(id: number) { if (confirm('Usunąć rodzaj zadania?')) this.service.delete(id).subscribe(() => this.load()); }
  closeForm() { this.showForm = false; }
  private emptyForm(): RodzajZadania { return { nazwa: '', opis: '' }; }
}
