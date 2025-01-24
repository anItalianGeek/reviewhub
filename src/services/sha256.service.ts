import { Injectable } from '@angular/core';
import CryptoJS from "crypto-js";

@Injectable({
    providedIn: 'root'
})
export class Sha256Service {

    constructor() { }

    encrypt(input: string): string {
        // Esegui l'hashing del testo di input usando SHA-256
        const hash = CryptoJS.SHA256(input);
        // Converte il risultato in formato esadecimale
        return hash.toString(CryptoJS.enc.Hex);
    }
}
