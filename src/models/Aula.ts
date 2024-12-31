import {Sportello} from './Sportello';

export interface Aula {
    id: number;
    nome: string;
    sportelli: Sportello[];
}
