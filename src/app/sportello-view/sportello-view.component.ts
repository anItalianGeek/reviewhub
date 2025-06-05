import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sportello} from '../../models/Sportello';
import {map, Observable, of} from 'rxjs';
import {AsyncPipe, DatePipe, NgFor, NgIf} from '@angular/common';
import {WrapperSportelliDocente} from '../../models/WrapperSportelliDocente';
import {Iscrizione} from '../../models/Iscrizione';
import {Persona} from '../../models/Persona';
import {isCI} from '@angular/cli/src/utilities/environment-options';
import {PersonaService} from '../../services/persona.service';
import {SportelloService} from '../../services/sportello.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {GiornoId} from '../../models/Giorno';
import {SportelloCompactViewComponent} from '../sportello-compact-view/sportello-compact-view.component';
import {LoaderComponent} from '../loader/loader.component';
import {BackButtonComponent} from '../back-button/back-button.component';
import {IscrizioneSportello} from '../../models/IscrizioneSportello';
import {ReturnStatement} from '@angular/compiler';

@Component({
  selector: 'app-sportello-view',
    imports: [
        AsyncPipe,
        NgIf,
        FormsModule,
        NgFor,
        SportelloCompactViewComponent,
        LoaderComponent,
        BackButtonComponent,
        DatePipe
    ],
  templateUrl: './sportello-view.component.html',
  styleUrl: './sportello-view.component.css'
})
export class SportelloViewComponent implements OnInit {

    @ViewChild('inizio', {static: false}) inizio!: ElementRef<HTMLInputElement>;
    @ViewChild('fine', {static: false}) fine!: ElementRef<HTMLInputElement>;
    alreadySubscribed: boolean;
    utente!: Observable<Persona>;
    sportello!: Observable<Sportello>;
    iscrizioniSportello?: Observable<Iscrizione[]>;
    dateIscrizioniUtenteAttuale: GiornoId[];
    mostraTastoSalvaModifiche: boolean;
    caricamentoCompletato: boolean;

    constructor(private personaService: PersonaService, private sportelloService: SportelloService, private route: ActivatedRoute, private router: Router) {
        this.caricamentoCompletato = false;
        if (localStorage.getItem('auth-role') == null || localStorage.getItem('auth-id') == null || localStorage.getItem('auth-token') == null) {
            this.router.navigateByUrl("/login");
        }

        this.alreadySubscribed = false;
        this.utente = personaService.getPersonaById(localStorage.getItem('auth-id')!, localStorage.getItem('auth-id')!);
        this.mostraTastoSalvaModifiche = false;
        this.dateIscrizioniUtenteAttuale = [];
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.sportelloService.getSportelloById(Number(params.get('id')), localStorage.getItem('auth-id')!)
                .subscribe(dati => {
                    this.iscrizioniSportello = of(dati.iscritti);
                    this.sportello = of(dati.sportellos[0]);

                    this.utente.subscribe(datiUtente => {
                        this.iscrizioniSportello?.subscribe(iscrizioni => {
                            iscrizioni.forEach(iscrizione => {
                                if (iscrizione.iscritti.find(e => e.includes(datiUtente.email)))
                                    this.dateIscrizioniUtenteAttuale.push(iscrizione.id);
                            });
                        });
                    });

                    this.caricamentoCompletato = true;
                });
        });
    }

    salvaModifiche() {
        this.sportello.subscribe(sportello => this.sportelloService.modificaSportello(sportello, localStorage.getItem('auth-id')!)
            .subscribe(result => {this.mostraTastoSalvaModifiche = false; location.reload()}, error => alert(error.message))
        );
    }

    aggiungiOrario() {
        if (this.inizio.nativeElement.value == undefined || this.inizio.nativeElement.value == "" || this.fine.nativeElement.value == "" || this.fine.nativeElement.value == undefined) {
            alert("Data invalida inserita!");
            return;
        }
        this.sportello.subscribe(sportello => {
           sportello.giorni.push({
               id: {
                   data_inizioId: new Date(
                       new Date(this.inizio.nativeElement.value).getTime() -
                       new Date(this.inizio.nativeElement.value).getTimezoneOffset() * 60000
                   ).toISOString().slice(0, 16)
                   ,
                   data_fineId: new Date(
                       new Date(this.fine.nativeElement.value).getTime() -
                       new Date(this.fine.nativeElement.value).getTimezoneOffset() * 60000
                   ).toISOString().slice(0, 16),
                   sportelloId: sportello.id_sportello
               },
               max_iscritti: sportello.giorni[0].max_iscritti,
               num_iscritti: 0
           })

        });
    }

    controllaSeIscritto(id: GiornoId): boolean {
        return this.dateIscrizioniUtenteAttuale.find(e => e.data_inizioId == id.data_inizioId && e.data_fineId == id.data_fineId && e.sportelloId == id.sportelloId) != undefined;
    }

    cancellaData(data_inizio: Date | string, data_fine: Date | string) {
        this.sportello.subscribe(sportello => sportello.giorni = sportello.giorni.filter(e => e.id.data_inizioId !== data_inizio && e.id.data_fineId !== data_fine));
    }

    iscrivi(giornoId: GiornoId) {
        this.sportello.subscribe(dati => {
            this.sportelloService.iscriviAlloSportello(dati.id_sportello, localStorage.getItem('auth-id')!, giornoId)
                .subscribe(next => {location.reload()}, error => {location.reload()}); // metodo identico al disiscrivi eppure lancia errore, ma funziona...
        });
    }

    disiscrivi(giornoId: GiornoId) {
        this.sportello.subscribe(dati => {
            this.sportelloService.disicriviDalloSportello(dati.id_sportello, localStorage.getItem('auth-id')!, giornoId)
                .subscribe(next => {this.alreadySubscribed = false; location.reload()});
        });
    }

    cancellaSportello() {
        this.sportello.subscribe(dati => {
            this.sportelloService.cancellaSportello(dati.id_sportello, localStorage.getItem('auth-id')!)
                .subscribe({next: () => {this.alreadySubscribed = true; window.history.back();}});
        });
    }

    rimuoviIscritto(utenteDaCancellare: string, giornoId: GiornoId) {
        this.sportello.subscribe(dati => {
            this.sportelloService.rimuoviIscritto(dati.id_sportello, utenteDaCancellare.split("@")[0].split("(")[1], localStorage.getItem('auth-id')!, giornoId)
                .subscribe({
                    next: () => {
                        this.iscrizioniSportello = this.iscrizioniSportello?.pipe(
                            map(iscrizioni => {
                                let iscrizioneTmp = iscrizioni.find(e => e.id === giornoId)!;
                                //let giorno = dati.giorni.find(e => e.id.data_inizioId == giornoId.data_inizioId && e.id.data_fineId == giornoId.data_fineId && e.id.sportelloId == giornoId.sportelloId)!;
                                //giorno.num_iscritti--;
                                iscrizioneTmp.iscritti = iscrizioneTmp.iscritti.filter(e => e !== utenteDaCancellare);
                                return iscrizioni;
                            })
                        );
                    }
                });
        });
    }
    
    isDateExpired(dataInizioId: string | Date) {
        return new Date(dataInizioId).getTime() < new Date().getTime();
    }

}
