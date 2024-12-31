import {Sportello} from './Sportello';

export interface Persona {
    email: string;
    nome?: string;
    cognome?: string;
    password?: string;
    ruolo?: string;
    classe?: string;
    sportelli?: Sportello[];
}
