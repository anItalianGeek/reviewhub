import { Component } from '@angular/core';
import {Materia} from '../../models/Materia';
import {Observable} from 'rxjs';
import {MateriaService} from '../../services/materia.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {BackButtonComponent} from '../back-button/back-button.component';

@Component({
  selector: 'app-materie-management',
    imports: [
        AsyncPipe,
        FormsModule,
        NgForOf,
        NgIf,
        BackButtonComponent
    ],
  templateUrl: './materie-management.component.html',
  styleUrl: './materie-management.component.css'
})
export class MaterieManagementComponent {

    materie: Observable<Materia[]>;
    modificheFatte: boolean;

    constructor(private materiaService: MateriaService) {
        this.materie = this.materiaService.getTutteMaterie();
        this.modificheFatte = false;
    }

    creaMateria(nome: string) {
        this.materiaService.aggiungiMateria({nome: nome, sportelli: []}).subscribe(result => location.reload());
    }

    modificaMateria(materia: Materia) {
        this.materiaService.cambiaMateria(materia).subscribe(result => location.reload());
    }

    cancellaMateria(materia: Materia) {
        if (confirm("Sei sicuro di voler cancellare la materia?"))
            this.materiaService.cancellaMateria(materia).subscribe(result => location.reload());
    }

}
