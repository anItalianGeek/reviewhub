import {Sportello} from './Sportello';
import {Persona} from './Persona';
import {Giorno, GiornoId} from './Giorno';

export interface IscrizioneSportello {
    id: IscrizioneSportelloId;
    sportello: Sportello;
    persona: Persona;
    giorno: Giorno;
}

export interface IscrizioneSportelloId {
    sportelloId: number;
    personaId: string;
    giornoId: GiornoId;
}
