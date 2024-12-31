import {Sportello} from './Sportello';
import {Iscrizione} from './Iscrizione';

export interface WrapperSportelliDocente {
    sportellos: Sportello[];
    iscritti: Iscrizione[];
}
