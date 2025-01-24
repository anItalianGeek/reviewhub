import  { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Aula} from '../../models/Aula';
import {AulaService} from '../../services/aula.service';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BackButtonComponent} from '../back-button/back-button.component';

@Component({
  selector: 'app-aule-management',
    imports: [
        NgFor,
        AsyncPipe,
        FormsModule,
        NgIf,
        BackButtonComponent
    ],
  templateUrl: './aule-management.component.html',
  styleUrl: './aule-management.component.css'
})
export class AuleManagementComponent {

    aule: Observable<Aula[]>;
    modificheFatte: boolean;

    constructor(private aulaService: AulaService) {
        this.aule = aulaService.getTutteAule();
        this.modificheFatte = false;
    }

    creaAula(numeroAula: string, nomeAula: string) {
        this.aulaService.aggiungiAula({id: Number(numeroAula).valueOf(), nome: nomeAula, sportelli: []}).subscribe(success => location.reload());
    }

    modificaAula(aula: Aula) {
        this.aulaService.cambiaAula(aula).subscribe(success => location.reload());
    }

    cancellaAula(aula: Aula) {
        if (confirm("Sei sicuro di voler cancellare l'aula?"))
            this.aulaService.cancellaAula(aula).subscribe(success => location.reload());
    }

}
