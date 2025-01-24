import {Sportello} from './Sportello';
import {Persona} from './Persona';

export interface IscrizioneSportello {
    id: IscrizioneSportelloId;
    sportello: Sportello;
    persona: Persona;
}

export interface IscrizioneSportelloId {
    sportelloId: number;
    personaId: string;
}
