import {Component, ElementRef, ViewChild} from '@angular/core';
import {Giorno, GiornoId} from '../../models/Giorno';
import {Observable} from 'rxjs';
import {Persona} from '../../models/Persona';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crea-sportello',
  imports: [],
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
    orari: GiornoId[] = [];

    constructor(private router: Router) {
        this.utente.subscribe((value) => {if (value.ruolo === "STUDENT") router.navigateByUrl("/home")})
    }

    aggiungiOrario() {
        this.orari.push({
            data_inizio: new Date(this.inizio.nativeElement.value),
            data_fine: new Date(this.fine.nativeElement.value),
            sportelloId: -1
        })
    }

    creaSportello() {

    }

}
