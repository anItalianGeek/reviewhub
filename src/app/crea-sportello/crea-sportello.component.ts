import {Component, ElementRef, ViewChild} from '@angular/core';
import {Giorno, GiornoId} from '../../models/Giorno';
import {Observable} from 'rxjs';
import {Persona} from '../../models/Persona';
import {Router} from '@angular/router';
import {SportelloService} from '../../services/sportello.service';
import {Sportello} from '../../models/Sportello';
import {Enviroment} from '../../Enviroment';
import {FormsModule} from '@angular/forms';
import {PersonaService} from '../../services/persona.service';
import {BackButtonComponent} from '../back-button/back-button.component';
import {AsyncPipe, NgFor} from '@angular/common';
import {Aula} from '../../models/Aula';
import {Materia} from '../../models/Materia';
import {AulaService} from '../../services/aula.service';
import {MateriaService} from '../../services/materia.service';

@Component({
  selector: 'app-crea-sportello',
    imports: [
        FormsModule,
        BackButtonComponent,
        NgFor,
        AsyncPipe
    ],
  templateUrl: './crea-sportello.component.html',
  styleUrl: './crea-sportello.component.css'
})
export class CreaSportelloComponent {

    utente!: Observable<Persona>;
    @ViewChild('descrizioneSportello', { static: false }) descrizioneSportello!: ElementRef<HTMLTextAreaElement>;
    @ViewChild('nomeSportello', { static: false }) nomeSportello!: ElementRef<HTMLInputElement>;
    @ViewChild('materia', { static: false }) materia!: ElementRef<HTMLSelectElement>;
    @ViewChild('maxPosti', { static: false }) maxPosti!: ElementRef<HTMLInputElement>;
    @ViewChild('inizio', { static: false }) inizio!: ElementRef<HTMLInputElement>;
    @ViewChild('fine', { static: false }) fine!: ElementRef<HTMLInputElement>;
    @ViewChild('aula', { static: false }) aula!: ElementRef<HTMLSelectElement>;
    orari: GiornoId[] = [];
    auleEsistenti: Observable<Aula[]>;
    materieEsistenti: Observable<Materia[]>;

    constructor(private router: Router, private sportelloService: SportelloService, private personaService: PersonaService, private materiaService: MateriaService, private aulaService: AulaService) {
        if (localStorage.getItem('auth-role') == null || localStorage.getItem('auth-id') == null || localStorage.getItem('auth-token') == null) {
            this.router.navigateByUrl("/login");
        }
        this.auleEsistenti = aulaService.getTutteAule();
        this.materieEsistenti = materiaService.getTutteMaterie();
        this.utente = personaService.getPersonaById(localStorage.getItem('auth-id')!, localStorage.getItem('auth-id')!);
        this.utente.subscribe((value) => {if (value.ruolo === "STUDENT") router.navigateByUrl("/home")})
    }

    aggiungiOrario() {
        this.orari.push({
            data_inizioId: new Date(
                new Date(this.inizio.nativeElement.value).getTime() -
                new Date(this.inizio.nativeElement.value).getTimezoneOffset() * 60000
            ).toISOString().slice(0, 16)
            ,
            data_fineId: new Date(
                new Date(this.fine.nativeElement.value).getTime() -
                new Date(this.fine.nativeElement.value).getTimezoneOffset() * 60000
            ).toISOString().slice(0, 16),
            sportelloId: -1
        })
    }

    cancellaData(data: GiornoId) {
        this.orari = this.orari.filter(e => e !== data);
    }

    creaSportello() {
        if (this.aula.nativeElement.value == '' || this.materia.nativeElement.value == ''){
            alert("Hai lasciato campi vuoti!");
            return;
        }

        let giorni: Giorno[] = [];
        this.orari.forEach(value =>
            giorni.push({
                id: value,
                max_iscritti: Number(this.maxPosti.nativeElement.value),
                num_iscritti: 0
            })
        );

        if (giorni.length == 0) {
            alert("Non puoi creare uno sportello senza alcuna data fissata!");
            return;
        }

        this.utente.subscribe(datiUtente => {
            let sportello: Sportello = {
                id_sportello: -1,
                nome_sportello: this.nomeSportello.nativeElement.value,
                descrizione_sportello: this.descrizioneSportello.nativeElement.value,
                aula: {
                    id: Number(this.aula.nativeElement.value),
                    nome: '',
                    sportelli: []
                },
                materia: {
                    nome: this.materia.nativeElement.value,
                    sportelli: []
                },
                sportello_disponibile: true,
                docente_responsabile: {
                    email: localStorage.getItem('auth-id') + Enviroment.DOMAIN,
                    nome: datiUtente.nome,
                    cognome: datiUtente.cognome,
                    classe: '',
                    ruolo: datiUtente.ruolo,
                    password: '',
                    sportelli: [],
                    iscrizioni: [],
                    authTokens: []
                },
                giorni: giorni,
                iscrizioni: []
            };

	    this.sportelloService.creaSportello(sportello, localStorage.getItem('auth-id')!).subscribe(result => location.reload(), error => {if (!error.message.includes("during parsing")) alert(error.message); location.reload();});
        });
    }

}
