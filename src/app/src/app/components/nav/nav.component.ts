import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar">
      <div class="sidebar-header">
        <h2>Logbook</h2>
      </div>
      <ul>
        <li><a routerLink="/piloci" routerLinkActive="active">Piloci</a></li>
        <li><a routerLink="/loty" routerLinkActive="active">Loty</a></li>
        <li><a routerLink="/lotniska" routerLinkActive="active">Lotniska</a></li>
        <li><a routerLink="/statki-powietrzne" routerLinkActive="active">Statki powietrzne</a></li>
        <li><a routerLink="/typy-statku" routerLinkActive="active">Typy statku</a></li>
        <li><a routerLink="/rodzaje-zadan" routerLinkActive="active">Rodzaje zadań</a></li>
        <li><a routerLink="/uprawnienia" routerLinkActive="active">Uprawnienia</a></li>
        <li><a routerLink="/pilot-uprawnienia" routerLinkActive="active">Uprawnienia pilotów</a></li>
      </ul>
    </nav>
  `
})
export class NavComponent {}
