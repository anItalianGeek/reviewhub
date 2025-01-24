import {Persona} from './Persona';

export interface AuthToken {
    id: AuthTokenId;
    user: Persona;
}

export interface AuthTokenId {
    tokenId: string;
    userId: string;
    expiresAtId: Date;
}
