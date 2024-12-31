import {Component, Input, OnDestroy} from '@angular/core';
import {Sportello} from '../../models/Sportello';
import {Observable} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {WrapperSportelliDocente} from '../../models/WrapperSportelliDocente';
import {Iscrizione} from '../../models/Iscrizione';
import {Persona} from '../../models/Persona';
import {isCI} from '@angular/cli/src/utilities/environment-options';

@Component({
  selector: 'app-sportello-view',
    imports: [
        AsyncPipe,
        NgIf
    ],
  templateUrl: './sportello-view.component.html',
  styleUrl: './sportello-view.component.css'
})
export class SportelloViewComponent implements OnDestroy {
    alreadySubscribed: boolean;
    utente!: Observable<Persona>;
    sportello!: Observable<Sportello>;
    iscrizioniSportello?: Observable<string[]>;

    constructor() {
        if (localStorage.getItem('alreadySubscribed') == null)
            window.history.back();
        this.alreadySubscribed = localStorage.getItem('alreadySubscribed') === "true";
    }

    iscrivi() {

    }

    disiscrivi() {

    }

    cancellaSportello() {

    }

    rimuoviIscritto() {

    }

    ngOnDestroy() {
        localStorage.removeItem('alreadySubscribed');
    }

}
