import {Persona} from './Persona';
import {Aula} from './Aula';
import {Materia} from './Materia';
import {Giorno} from './Giorno';
import {IscrizioneSportello} from './IscrizioneSportello';

export interface Sportello {
    readonly id_sportello: number;
    nome_sportello: string;
    descrizione_sportello: string;
    aula: Aula;
    materia: Materia;
    sportello_disponibile: boolean;
    docente_responsabile: Persona;
    giorni: Giorno[];
    iscrizioni: IscrizioneSportello[];
}
