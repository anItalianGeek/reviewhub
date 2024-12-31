import {Persona} from './Persona';
import {Aula} from './Aula';
import {Materia} from './Materia';
import {Giorno} from './Giorno';

export interface Sportello {
    id_sportello: number;
    nome_sportello: string;
    descrizione_sportello: string;
    max_iscritti: number;
    num_iscritti: number;
    aula: Aula;
    materia: Materia;
    docente_responsabile: Persona;
    giorni: Giorno[];
}
