import {ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Persona} from '../../models/Persona';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {SportelloCompactViewComponent} from '../sportello-compact-view/sportello-compact-view.component';
import {Sportello} from '../../models/Sportello';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {PersonaService} from '../../services/persona.service';
import {SportelloService} from '../../services/sportello.service';
import {LoaderComponent} from '../loader/loader.component';

@Component({
  selector: 'app-homepage',
    imports: [
        NgIf,
        SportelloCompactViewComponent,
        AsyncPipe,
        NgFor,
        LoaderComponent
    ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnDestroy {
    utente!: Observable<Persona>;
    @ViewChild('disponibiliCB', {static: false}) disponibiliCB!: ElementRef<HTMLInputElement>;
    @ViewChild('prenotatiCB', {static: false}) prenotatiCB!: ElementRef<HTMLInputElement>;
    sportelli!: Observable<Sportello[]>;
    copiaSportelliOriginale!: Sportello[];
    sportelliTrovati: boolean;
    caricamentoCompletato: boolean;
    currentPage = 0;

    constructor(private personaService: PersonaService, private sportelloService: SportelloService, protected router: Router, private cdr: ChangeDetectorRef) {
        this.sportelliTrovati = false;
        this.caricamentoCompletato = false;
        if (localStorage.getItem('auth-role') == null || localStorage.getItem('auth-id') == null || localStorage.getItem('auth-token') == null) {
            this.router.navigateByUrl("/login");
        } else {
            window.history.replaceState(null, '', window.location.href);
        }
        this.utente = personaService.getPersonaById(localStorage.getItem('auth-id')!, localStorage.getItem('auth-id')!);
        if (localStorage.getItem('auth-role') === 'TEACHER')
            this.sportelloService.getSportelliBy(localStorage.getItem('auth-id')!, localStorage.getItem('auth-id')!, 0)
                .subscribe(dati => {
                    this.sportelli = of(dati.sportellos);
                    this.copiaSportelliOriginale = dati.sportellos;
                    this.caricamentoCompletato = true;
                });
        else if (localStorage.getItem('auth-role') === 'ADMIN') {
            this.sportelli = this.sportelloService.getAllSportelli(localStorage.getItem('auth-id')!, 0);
            this.sportelli.subscribe(dati => {
                this.caricamentoCompletato = true;
                this.copiaSportelliOriginale = dati;
            });
        } else {
            this.caricamentoCompletato = true;
        }
    }

    route(sportello: number): void {
        this.router.navigateByUrl("/sportello/" + sportello);
    }

    navigateToPage(page: number) {
        if (page < 0)
            return;
        if (!this.prenotatiCB && !this.disponibiliCB)
            this.sportelli = this.sportelloService.getAllSportelli(localStorage.getItem('auth-id')!, page * 10);
        else if (this.prenotatiCB.nativeElement.checked)
            this.sportelli = this.sportelloService.getSportelliPrenotati(localStorage.getItem('auth-id')!, page * 10);
        else if (this.disponibiliCB.nativeElement.checked)
            this.sportelli = this.sportelloService.getSportelliDisponibili(localStorage.getItem('auth-id')!, page * 10);
        this.currentPage = page;
        this.cdr.detectChanges();
    }

    cercaSportelli(sportelliDisponibili: boolean) {
        if (sportelliDisponibili)
            this.sportelli = this.sportelloService.getSportelliDisponibili(localStorage.getItem('auth-id')!, 0);
        else
            this.sportelli = this.sportelloService.getSportelliPrenotati(localStorage.getItem('auth-id')!, 0);
        this.sportelli.subscribe(sportelliDisponibili => {
            this.sportelliTrovati = sportelliDisponibili.length == 0;
            this.copiaSportelliOriginale = sportelliDisponibili;
            this.caricamentoCompletato = true;
        });
    }

    cerca(input: string) {
        if (input === "") {
            this.sportelli = of(this.copiaSportelliOriginale);
        } else {
            this.sportelli = of(this.copiaSportelliOriginale.filter(e =>
                e.nome_sportello.toLowerCase().includes(input.toLowerCase()) ||
                e.descrizione_sportello.toLowerCase().includes(input.toLowerCase()) ||
                e.materia.nome.toLowerCase().includes(input.toLowerCase())
            ));
        }
    }


    logout() {
        this.personaService.logout().subscribe(
            result => {
                localStorage.removeItem('auth-id');
                localStorage.removeItem('auth-token');
                localStorage.removeItem('auth-role');
                this.router.navigateByUrl("/login");
            }
        );
    }

    ngOnDestroy() {
        if (this.prenotatiCB)
            localStorage.setItem('alreadySubscribed', this.prenotatiCB.nativeElement.checked ? "true" : "false");
    }
}
