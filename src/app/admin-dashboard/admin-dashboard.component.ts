import { Component } from '@angular/core';
import {UserViewComponent} from '../user-view/user-view.component';
import {Observable, of} from 'rxjs';
import {Persona} from '../../models/Persona';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {PersonaService} from '../../services/persona.service';
import {Router} from '@angular/router';
import {Sportello} from '../../models/Sportello';
import {BackButtonComponent} from '../back-button/back-button.component';

@Component({
  selector: 'app-admin-dashboard',
    imports: [
        UserViewComponent,
        AsyncPipe,
        NgFor,
        NgIf,
        BackButtonComponent,
        BackButtonComponent
    ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent {
    datiPersone!: Observable<{ persona: Persona; sportelli: Sportello[] }[]>;
    caricamentoCompletato: boolean;

    constructor(private personaService: PersonaService, private router: Router) {
        this.caricamentoCompletato = false;
        if (localStorage.getItem('auth-role') == null || localStorage.getItem('auth-id') == null || localStorage.getItem('auth-token') == null) {
            this.router.navigateByUrl("/login");
        }

        this.datiPersone = personaService.getTuttePersone(localStorage.getItem('auth-id')!);
        this.datiPersone.subscribe(datiPersone => {this.caricamentoCompletato = true})
    }

    route(route: string) {
        this.router.navigateByUrl("/admin-dashboard/" + route);
    }
}
