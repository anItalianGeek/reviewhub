import {Component, ElementRef, ViewChild} from '@angular/core';
import {BackButtonComponent} from '../back-button/back-button.component';
import {UserViewComponent} from '../user-view/user-view.component';
import {Persona} from '../../models/Persona';
import {PersonaService} from '../../services/persona.service';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from 'rxjs';
import {Sha256Service} from '../../services/sha256.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-crea-utente',
    imports: [
        BackButtonComponent,
        NgIf
    ],
  templateUrl: './crea-utente.component.html',
  styleUrl: './crea-utente.component.css'
})
export class CreaUtenteComponent {

    @ViewChild('email', {static: false}) email!: ElementRef<HTMLInputElement>;
    @ViewChild('nome', {static: false}) nome!: ElementRef<HTMLInputElement>;
    @ViewChild('cognome', {static: false}) cognome!: ElementRef<HTMLInputElement>;
    @ViewChild('classe', {static: false}) classe!: ElementRef<HTMLInputElement>;
    @ViewChild('password', {static: false}) password!: ElementRef<HTMLInputElement>;
    @ViewChild('ruolo', {static: false}) ruolo!: ElementRef<HTMLInputElement>;
    emailProposte: Subject<string>;
    emailDisponibile: boolean;

    constructor(private personaService: PersonaService, private sha256: Sha256Service, private router: Router) {
        this.emailDisponibile = false;
        this.emailProposte = new Subject<string>();
        this.emailProposte.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(email => this.personaService.verificaDisponibilitaEmail(email))
        ).subscribe(bool => this.emailDisponibile = !bool);
    }

    crea() {
        if (this.emailDisponibile)
            this.personaService.creaPersona({
                email: this.email.nativeElement.value,
                classe: this.classe.nativeElement.value,
                nome: this.nome.nativeElement.value,
                cognome: this.cognome.nativeElement.value,
                ruolo: this.ruolo.nativeElement.value,
                password: this.sha256.encrypt(this.password.nativeElement.value),
                sportelli: [],
                authTokens: [],
                iscrizioni: []
            }).subscribe(result => this.router.navigateByUrl("/admin-dashboard"), error => this.router.navigateByUrl("/admin-dashboard"));
    }

}
