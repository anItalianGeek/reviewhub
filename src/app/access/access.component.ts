import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {PersonaService} from '../../services/persona.service';
import {Sha256Service} from '../../services/sha256.service';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';

@Component({
    selector: 'app-access',
    imports: [
        NgIf
    ],
    templateUrl: './access.component.html',
    styleUrl: './access.component.css'
})
export class AccessComponent {

    loginPage: boolean;
    showPasswordRecoveryForm: boolean;
    emailProposte: Subject<string>;
    emailAvailable: boolean;
    @ViewChild('email', {static: false}) email!: ElementRef<HTMLInputElement>;
    @ViewChild('password', {static: false}) password!: ElementRef<HTMLInputElement>;
    @ViewChild('recoveryEmail', {static: false}) recoveryEmail!: ElementRef<HTMLInputElement>;
    @ViewChild('email_signup', {static: false}) email_signup!: ElementRef<HTMLInputElement>;
    @ViewChild('password_signup', {static: false}) password_signup!: ElementRef<HTMLInputElement>;
    @ViewChild('nome', {static: false}) nome!: ElementRef<HTMLInputElement>;
    @ViewChild('cognome', {static: false}) cognome!: ElementRef<HTMLInputElement>;
    @ViewChild('classe', {static: false}) classe!: ElementRef<HTMLInputElement>;

    constructor(private personaService: PersonaService, private sha256encryptor: Sha256Service, private route: Router) {
        if (localStorage.getItem('auth-role') != null && localStorage.getItem('auth-id') != null && localStorage.getItem('auth-token') != null) {
            this.route.navigateByUrl("/home");
        }

        this.showPasswordRecoveryForm = false;
        this.loginPage = true;
        this.emailAvailable = false;
        this.emailProposte = new Subject<string>();
        this.emailProposte.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(email => this.personaService.verificaDisponibilitaEmail(email))
        ).subscribe(bool => this.emailAvailable = !bool);
    }

    login() {
        this.personaService.logIn({
            email: this.email.nativeElement.value,
            password: this.password.nativeElement.value,
            classe: null,
            ruolo: 'NONE',
            nome: null,
            cognome: null,
            sportelli: null,
            authTokens: null,
            iscrizioni: null
        }).subscribe(success => {
            this.route.navigateByUrl('/home');
        }, error => {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('auth-role');
            localStorage.removeItem('auth-id');
        });
    }

    registrati() {
        if (this.emailAvailable)
            this.personaService.creaPersona({
                email: this.email_signup.nativeElement.value,
                password: this.password_signup.nativeElement.value,
                classe: this.classe.nativeElement.value,
                ruolo: 'STUDENT',
                nome: this.nome.nativeElement.value,
                cognome: this.cognome.nativeElement.value,
                sportelli: null
            }).subscribe(success => location.reload(), error => {if (error.status < 400) location.reload(); else alert(error.message + "\n(Tuttavia prova ad accedere al tuo account...)")});
        else
            alert("Email Non Disponibile! Impossibile creare l'account!");
    }

    requestPasswordRecovery(email: string) {

    }

}
