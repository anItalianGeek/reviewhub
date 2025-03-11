import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {Persona} from '../../models/Persona';
import {NgFor, NgIf} from '@angular/common';
import {SportelloCompactViewComponent} from '../sportello-compact-view/sportello-compact-view.component';
import {PersonaService} from '../../services/persona.service';
import {SportelloService} from '../../services/sportello.service';
import {Router} from '@angular/router';
import {Sportello} from '../../models/Sportello';
import {FormsModule} from '@angular/forms';
import {Sha256Service} from '../../services/sha256.service';

@Component({
    selector: 'app-user-view',
    imports: [
        SportelloCompactViewComponent,
        NgFor,
        NgIf,
        FormsModule
    ],
    templateUrl: './user-view.component.html',
    styleUrl: './user-view.component.css'
})
export class UserViewComponent implements OnChanges {

    @ViewChild('vecchiaPassword', {static: false}) vecchiaPassword!: ElementRef<HTMLInputElement>;
    @ViewChild('nuovaPassword', {static: false}) nuovaPassword!: ElementRef<HTMLInputElement>;
    @ViewChild('confermaPassword', {static: false}) confermaPassword!: ElementRef<HTMLInputElement>;
    @Input() utente!: Persona;
    @Input() sportelliPrenotati!: Sportello[];
    username!: string;
    cambioNome!: boolean;
    cambioCognome!: boolean;
    cambioClasse!: boolean;
    cambioRuolo!: boolean;
    cambioPassword!: boolean;
    mostraTastoSalvaModifiche!: boolean;

    constructor(private sha256: Sha256Service, private personaService: PersonaService, private sportelloService: SportelloService, private router: Router) {
        if (localStorage.getItem('auth-role') == null || localStorage.getItem('auth-id') == null || localStorage.getItem('auth-token') == null) {
            this.router.navigateByUrl("/login");
        }
    }

    ngOnChanges() {
        this.username = this.utente.nome + " " + this.utente.cognome + " (" + this.utente.email + ")";
        this.cambioNome = false;
        this.cambioCognome = false;
        this.cambioClasse = false;
        this.cambioRuolo = false;
        this.cambioPassword = false;
        this.mostraTastoSalvaModifiche = false;
    }

    salvaModifiche() {
        if (this.nuovaPassword.nativeElement && this.confermaPassword.nativeElement)
            if (this.nuovaPassword.nativeElement.value == this.confermaPassword.nativeElement.value)
                this.utente.password = this.confermaPassword.nativeElement.value;
	    else {
	        alert("La nuova password con corrisponde con la password di conferma!");
		return;
	    }

        this.personaService.modificaPersona(this.utente, localStorage.getItem('auth-id')!).subscribe(success => location.reload(), error => {if (error.status >= 400) alert(error.message); else location.reload();});
    }

    eliminaUtente() {
        this.personaService.cancellaPersona(this.utente.email, localStorage.getItem('auth-id')!).subscribe(
            response => {location.reload()},
            error => alert(error.message)
        );
    }

    cambiaPassword() {
        if (this.cambioPassword){
            this.nuovaPassword.nativeElement.value = '';
            this.nuovaPassword.nativeElement.style.display = 'initial';
            this.confermaPassword.nativeElement.value = '';
            this.confermaPassword.nativeElement.style.display = 'initial';
        }
        else {
            this.nuovaPassword.nativeElement.value = '';
            this.nuovaPassword.nativeElement.style.display = 'none';
            this.confermaPassword.nativeElement.value = '';
            this.confermaPassword.nativeElement.style.display = 'none';
        }
    }

    route(path: string) {
        this.router.navigateByUrl(path);
    }

}
