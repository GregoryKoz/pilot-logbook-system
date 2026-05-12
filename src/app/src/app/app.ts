import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  template: `
    <div class="layout">
      <app-nav></app-nav>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {}
