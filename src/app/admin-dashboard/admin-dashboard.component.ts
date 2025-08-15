import {ChangeDetectorRef, Component} from '@angular/core';
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
        BackButtonComponent
    ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent {
    datiPersone!: Observable<{ persona: Persona; sportelli: Sportello[] }[]>;
    copiaDatiPersone!: { persona: Persona; sportelli: Sportello[] }[];
    caricamentoCompletato: boolean;
    currentPage = 0;

    constructor(private personaService: PersonaService, private router: Router, private cdr: ChangeDetectorRef) {
        this.caricamentoCompletato = false;
        if (localStorage.getItem('auth-role') == null || localStorage.getItem('auth-id') == null || localStorage.getItem('auth-token') == null) {
            this.router.navigateByUrl("/login");
        }

        this.datiPersone = personaService.getTuttePersone(localStorage.getItem('auth-id')!, 0);
        this.datiPersone.subscribe(datiPersone => {
            this.copiaDatiPersone = datiPersone;
            this.caricamentoCompletato = true
        })
    }

    route(route: string) {
        this.router.navigateByUrl("/admin-dashboard/" + route);
    }

    navigateToPage(page: number) {
        if (page < 0)
            return;
        this.caricamentoCompletato = false;
        this.datiPersone = this.personaService.getTuttePersone(localStorage.getItem('auth-id')!, page * 30);
        this.datiPersone.subscribe(datiPersone => {
            this.copiaDatiPersone = datiPersone;
            this.caricamentoCompletato = true
        })
        this.currentPage = page;
        this.cdr.detectChanges();
    }

    cerca(s: string) {
        if (s === "") {
            this.datiPersone = of(this.copiaDatiPersone);
        } else {
            this.datiPersone = of(this.copiaDatiPersone.filter(e =>
                e.persona.email.toLowerCase().includes(s.toLowerCase()) ||
                e.persona.nome?.toLowerCase().includes(s.toLowerCase()) ||
                e.persona.cognome?.toLowerCase().includes(s.toLowerCase())
            ))
        }
    }
}
