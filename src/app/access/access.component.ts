import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {PersonaService} from '../../services/persona.service';
import {Sha256Service} from '../../services/sha256.service';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';
import {TmplAstLetDeclaration} from '@angular/compiler';

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
    loginError: boolean;
    errorMessage!: string;
    showPasswordRecoveryForm: boolean;
    emailProposte: Subject<string>;
    emailAvailable: boolean;
    @ViewChild('email', {static: false}) email!: ElementRef<HTMLInputElement>;
    @ViewChild('password', {static: false}) password!: ElementRef<HTMLInputElement>;
    @ViewChild('recoveryEmail', {static: false}) recoveryEmail!: ElementRef<HTMLInputElement>;
    @ViewChild('email_signup', {static: false}) email_signup!: ElementRef<HTMLInputElement>;
    @ViewChild('password_signup', {static: false}) password_signup!: ElementRef<HTMLInputElement>;
    @ViewChild('password_signup_check', {static: false}) password_signup_check!: ElementRef<HTMLInputElement>;
    @ViewChild('nome', {static: false}) nome!: ElementRef<HTMLInputElement>;
    @ViewChild('cognome', {static: false}) cognome!: ElementRef<HTMLInputElement>;
    @ViewChild('classe', {static: false}) classe!: ElementRef<HTMLInputElement>;

    constructor(private personaService: PersonaService, private sha256encryptor: Sha256Service, private route: Router) {
        if (localStorage.getItem('auth-role') != null && localStorage.getItem('auth-id') != null && localStorage.getItem('auth-token') != null) {
            this.route.navigateByUrl("/home");
        }

        this.errorMessage = "Si è verificato un problema.";
        this.loginError = false;
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
        this.loginError = false;
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
            if (error.status === 401)
                this.errorMessage = "Accesso Fallito. Si prega di verificare password o email.";
            if (error.status >= 500)
                this.errorMessage = "Si verificato un errore nel server.";
            this.loginError = true;
            localStorage.removeItem('auth-token');
            localStorage.removeItem('auth-role');
            localStorage.removeItem('auth-id');
        });
    }

    registrati() {
        if (this.password_signup_check.nativeElement.value !== this.password.nativeElement.value) {
            alert("le password inserite non coincidono!");
            return;
        }

        if (this.emailAvailable)
            this.personaService.creaPersona({
                email: this.email_signup.nativeElement.value,
                password: this.password_signup.nativeElement.value,
                classe: this.classe.nativeElement.value,
                ruolo: 'STUDENT',
                nome: this.nome.nativeElement.value,
                cognome: this.cognome.nativeElement.value,
                sportelli: null
            }).subscribe(success => location.reload(), error => {
                if (error.status >= 400)
                    alert(error.message);
                else
                    location.reload();
            });
        else
            alert("Email Non Disponibile! Impossibile creare l'account!");
    }

    requestPasswordRecovery(email: string) {

    }

}
