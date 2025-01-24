import {Sportello} from './Sportello';
import {Iscrizione} from './Iscrizione';
import {AuthToken} from './AuthToken';
import {IscrizioneSportello} from './IscrizioneSportello';

export interface Persona {
    readonly email: string;
    nome?: string | null;
    cognome?: string | null;
    password?: string | null;
    ruolo?: string | null;
    classe?: string | null;
    sportelli?: Sportello[] | null;
    iscrizioni?: IscrizioneSportello[] | null;
    authTokens?: AuthToken[] | null;
}
