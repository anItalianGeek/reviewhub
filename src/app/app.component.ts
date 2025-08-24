import {Component, OnDestroy} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PersonaService} from '../services/persona.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  title = 'ReviewHub Web Client';

    refreshSubscription!: Subscription;

  constructor(private personaService: PersonaService) {
      this.refreshSubscription = interval(15 * 60 * 1000).subscribe(() => {
          if (localStorage.getItem('auth-token') != null)
            personaService.refreshTokenAccesso().subscribe(newToken => localStorage.setItem('auth-token', newToken.token));
      });
  }

  ngOnDestroy() {
      this.refreshSubscription.unsubscribe();
  }
}
