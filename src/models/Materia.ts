import {Sportello} from './Sportello';

export interface Materia {
    id: number;
    nome: string;
    sportelli: Sportello[];
}
