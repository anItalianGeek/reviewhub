import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Persona} from '../../models/Persona';
import {AsyncPipe, NgIf} from '@angular/common';
import {SportelloCompactViewComponent} from '../sportello-compact-view/sportello-compact-view.component';
import {Sportello} from '../../models/Sportello';
import {Observable} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-homepage',
    imports: [
        NgIf,
        SportelloCompactViewComponent,
        AsyncPipe,
        RouterLink
    ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnDestroy {
    utente!: Observable<Persona>;
    @ViewChild('disponibiliCB', {static: false}) disponibiliCB!: ElementRef<HTMLInputElement>;
    @ViewChild('prenotatiCB', {static: false}) prenotatiCB!: ElementRef<HTMLInputElement>;
    sportelli!: Observable<Sportello[]>;

    constructor() {
        // recupera utente con i service
    }

    ngOnDestroy() {
        localStorage.setItem('alreadySubscribed', this.prenotatiCB.nativeElement.checked ? "true" : "false");
    }
}
