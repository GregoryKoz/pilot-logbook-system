import { Routes } from '@angular/router';
import { PilocyComponent } from './components/piloci/piloci.component';
import { LotyComponent } from './components/loty/loty.component';
import { LotniskaComponent } from './components/lotniska/lotniska.component';
import { StatkiPowietrzneComponent } from './components/statki-powietrzne/statki-powietrzne.component';
import { TypyStatkuComponent } from './components/typy-statku/typy-statku.component';
import { RodzajeZadanComponent } from './components/rodzaje-zadan/rodzaje-zadan.component';
import { UprawieniaComponent } from './components/uprawnienia/uprawnienia.component';
import { PilotUprawieniaComponent } from './components/pilot-uprawnienia/pilot-uprawnienia.component';

export const routes: Routes = [
  { path: '', redirectTo: 'piloci', pathMatch: 'full' },
  { path: 'piloci', component: PilocyComponent },
  { path: 'loty', component: LotyComponent },
  { path: 'lotniska', component: LotniskaComponent },
  { path: 'statki-powietrzne', component: StatkiPowietrzneComponent },
  { path: 'typy-statku', component: TypyStatkuComponent },
  { path: 'rodzaje-zadan', component: RodzajeZadanComponent },
  { path: 'uprawnienia', component: UprawieniaComponent },
  { path: 'pilot-uprawnienia', component: PilotUprawieniaComponent },
];
