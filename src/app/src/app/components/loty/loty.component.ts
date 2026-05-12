import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lot, Pilot, StatekPowietrzny, Lotnisko, RodzajZadania, NalotSumaryczny } from '../../models/models';
import { LotService } from '../../services/lot.service';
import { PilotService } from '../../services/pilot.service';
import { StatekPowietrznyService } from '../../services/statek-powietrzny.service';
import { LotniskoService } from '../../services/lotnisko.service';
import { RodzajZadaniaService } from '../../services/rodzaj-zadania.service';

@Component({
  selector: 'app-loty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Loty</h1>
      <div class="toolbar">
        <button class="btn-primary" (click)="openForm()">+ Dodaj lot</button>
        <button class="btn-secondary" (click)="showNalot = !showNalot">
          {{ showNalot ? 'Ukryj' : 'Pokaż' }} nalot sumaryczny
        </button>
      </div>

      <div *ngIf="showNalot" class="nalot-card">
        <h3>Nalot sumaryczny</h3>
        <table>
          <thead>
            <tr><th>Pilot</th><th>Loty</th><th>Block (h)</th><th>Airborne (h)</th><th>PIC (h)</th><th>SIC (h)</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let n of nalot">
              <td>{{ n.pilotImie }} {{ n.pilotNazwisko }}</td>
              <td>{{ n.liczbaLotow }}</td>
              <td>{{ n.sumaBlock | number:'1.1-1' }}</td>
              <td>{{ n.sumaAirborne | number:'1.1-1' }}</td>
              <td>{{ n.sumaPIC | number:'1.1-1' }}</td>
              <td>{{ n.sumaSIC | number:'1.1-1' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="showForm" class="modal-backdrop">
        <div class="modal modal-wide">
          <h2>{{ editId ? 'Edytuj lot' : 'Dodaj lot' }}</h2>
          <form (ngSubmit)="save()">
            <div class="form-grid">
              <div>
                <label>Data lotu</label>
                <input type="date" [(ngModel)]="form.dataLotu" name="dataLotu" required />
              </div>
              <div>
                <label>Numer lotu</label>
                <input [(ngModel)]="form.numerLotu" name="numerLotu" />
              </div>
              <div>
                <label>Pilot</label>
                <select [(ngModel)]="form.pilotId" name="pilotId">
                  <option [ngValue]="undefined">-- brak --</option>
                  <option *ngFor="let p of pilots" [ngValue]="p.id">{{ p.imie }} {{ p.nazwisko }}</option>
                </select>
              </div>
              <div>
                <label>Statek powietrzny</label>
                <select [(ngModel)]="form.statekPowietrznyId" name="statekId">
                  <option [ngValue]="undefined">-- brak --</option>
                  <option *ngFor="let s of statki" [ngValue]="s.id">{{ s.rejestracja }}</option>
                </select>
              </div>
              <div>
                <label>Lotnisko startu</label>
                <select [(ngModel)]="form.lotniskoStartId" name="lotniskoStartId">
                  <option [ngValue]="undefined">-- brak --</option>
                  <option *ngFor="let l of lotniska" [ngValue]="l.id">{{ l.kodIcao }} - {{ l.nazwa }}</option>
                </select>
              </div>
              <div>
                <label>Lotnisko lądowania</label>
                <select [(ngModel)]="form.lotniskoLadowanieId" name="lotniskoLadId">
                  <option [ngValue]="undefined">-- brak --</option>
                  <option *ngFor="let l of lotniska" [ngValue]="l.id">{{ l.kodIcao }} - {{ l.nazwa }}</option>
                </select>
              </div>
              <div>
                <label>Rodzaj zadania</label>
                <select [(ngModel)]="form.rodzajZadaniaId" name="rodzajId">
                  <option [ngValue]="undefined">-- brak --</option>
                  <option *ngFor="let r of rodzaje" [ngValue]="r.id">{{ r.nazwa }}</option>
                </select>
              </div>
              <div>
                <label>Czas Block (h)</label>
                <input type="number" step="0.1" [(ngModel)]="form.czasBlock" name="czasBlock" />
              </div>
              <div>
                <label>Czas Airborne (h)</label>
                <input type="number" step="0.1" [(ngModel)]="form.czasAirborne" name="czasAirborne" />
              </div>
              <div>
                <label>Czas PIC (h)</label>
                <input type="number" step="0.1" [(ngModel)]="form.czasPIC" name="czasPIC" />
              </div>
              <div>
                <label>Czas SIC (h)</label>
                <input type="number" step="0.1" [(ngModel)]="form.czasSIC" name="czasSIC" />
              </div>
              <div>
                <label>Kategoria operacji</label>
                <select [(ngModel)]="form.kategoriaOperacji" name="kategoriaOperacji">
                  <option [ngValue]="undefined">-- brak --</option>
                  <option value="VFR">VFR</option>
                  <option value="IFR">IFR</option>
                </select>
              </div>
              <div>
                <label>Pora operacji</label>
                <select [(ngModel)]="form.poraOperacji" name="poraOperacji">
                  <option [ngValue]="undefined">-- brak --</option>
                  <option value="DAY">Dzienna</option>
                  <option value="NIGHT">Nocna</option>
                </select>
              </div>
              <div>
                <label>Typ lotu</label>
                <select [(ngModel)]="form.typLotu" name="typLotu">
                  <option [ngValue]="undefined">-- brak --</option>
                  <option value="REAL">Rzeczywisty</option>
                  <option value="SIMULATOR">Symulator</option>
                </select>
              </div>
              <div class="full-width">
                <label>Uwagi</label>
                <textarea [(ngModel)]="form.uwagi" name="uwagi" rows="2"></textarea>
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-primary">Zapisz</button>
              <button type="button" class="btn-secondary" (click)="closeForm()">Anuluj</button>
            </div>
          </form>
        </div>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Data</th><th>Nr lotu</th><th>Pilot</th><th>Statek</th>
              <th>Start</th><th>Lądowanie</th><th>Block (h)</th><th>Kategoria</th><th>Typ</th><th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let l of loty">
              <td>{{ l.id }}</td>
              <td>{{ l.dataLotu }}</td>
              <td>{{ l.numerLotu }}</td>
              <td>{{ l.pilotImie }} {{ l.pilotNazwisko }}</td>
              <td>{{ l.statekPowietrznyRejestracja }}</td>
              <td>{{ l.lotniskoStartKodIcao }}</td>
              <td>{{ l.lotniskoLadowanieKodIcao }}</td>
              <td>{{ l.czasBlock }}</td>
              <td>{{ l.kategoriaOperacji }}</td>
              <td>{{ l.typLotu }}</td>
              <td>
                <button class="btn-edit" (click)="edit(l)">Edytuj</button>
                <button class="btn-delete" (click)="delete(l.id!)">Usuń</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class LotyComponent implements OnInit {
  loty: Lot[] = [];
  pilots: Pilot[] = [];
  statki: StatekPowietrzny[] = [];
  lotniska: Lotnisko[] = [];
  rodzaje: RodzajZadania[] = [];
  nalot: NalotSumaryczny[] = [];
  showForm = false;
  showNalot = false;
  editId?: number;
  form: Lot = this.emptyForm();

  constructor(
    private service: LotService,
    private pilotService: PilotService,
    private statekService: StatekPowietrznyService,
    private lotniskoService: LotniskoService,
    private rodzajService: RodzajZadaniaService
  ) {}

  ngOnInit() {
    this.load();
    this.pilotService.getAll().subscribe(d => this.pilots = d);
    this.statekService.getAll().subscribe(d => this.statki = d);
    this.lotniskoService.getAll().subscribe(d => this.lotniska = d);
    this.rodzajService.getAll().subscribe(d => this.rodzaje = d);
    this.service.getNalotSumaryczny().subscribe(d => this.nalot = d);
  }

  load() { this.service.getAll().subscribe(d => this.loty = d); }

  openForm() { this.form = this.emptyForm(); this.editId = undefined; this.showForm = true; }

  edit(l: Lot) { this.editId = l.id; this.form = { ...l }; this.showForm = true; }

  save() {
    const obs = this.editId ? this.service.update(this.editId, this.form) : this.service.create(this.form);
    obs.subscribe(() => {
      this.load();
      this.service.getNalotSumaryczny().subscribe(d => this.nalot = d);
      this.closeForm();
    });
  }

  delete(id: number) {
    if (confirm('Usunąć lot?')) {
      this.service.delete(id).subscribe(() => {
        this.load();
        this.service.getNalotSumaryczny().subscribe(d => this.nalot = d);
      });
    }
  }

  closeForm() { this.showForm = false; }

  private emptyForm(): Lot { return { dataLotu: '' }; }
}
