import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Persona} from '../models/Persona';
import {Observable, tap} from 'rxjs';
import {Sha256Service} from './sha256.service';
import {Sportello} from '../models/Sportello';
import {Enviroment} from '../Enviroment';

@Injectable({
    providedIn: 'root'
})
export class PersonaService {

    private readonly apiUrl: string = 'https://reviewhub.chilesotti.it:8888/users/';
    constructor(private http: HttpClient, private sha256encryptor: Sha256Service) {
    }

    verificaDisponibilitaEmail(email: string): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'check', email, {headers: new HttpHeaders({'Authorization': 'Bearer '})});
    }

    getTuttePersone(utente: string): Observable<{ persona: Persona, sportelli: Sportello[] }[]> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.get<{ persona: Persona, sportelli: Sportello[] }[]>(this.apiUrl + 'all', {params: params, headers: headers})
    }

    getPersonaById(id: String, utente: string): Observable<Persona> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
	let observable: Observable<Persona> = this.http.get<Persona>(this.apiUrl + id, {params: params, headers: headers});
        observable.subscribe((persona: Persona) => {}, error => {
	    if (error.status == 401) {
		localStorage.removeItem('auth-id');
		localStorage.removeItem('auth-role');
		localStorage.removeItem('auth-token');
	    }
	});
	return observable;
    }

    logIn(persona: Persona): Observable<{ token: string, ruolo: string}> {
        persona.password = persona.password ?? '';
        return this.http.post<{ token: string, ruolo: string}>(this.apiUrl + 'login', persona).pipe(
            tap(serverResponse => {
                localStorage.setItem('auth-token', serverResponse.token);
                localStorage.setItem('auth-id', persona.email.split('@')[0]);
                localStorage.setItem('auth-role', serverResponse.ruolo);
            })
        );
    }

    creaPersona(persona: Persona): Observable<string> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', localStorage.getItem('auth-id') ? localStorage.getItem('auth-id') + Enviroment.DOMAIN : encodeURIComponent(persona.email));
        return this.http.post<string>(this.apiUrl + 'create', persona, {params: params, headers: headers});
    }

    modificaPersona(persona: Persona, utente: string): Observable<Persona> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        let observable: Observable<Persona> = this.http.put<Persona>(this.apiUrl + 'modify/' + persona.email.split("@")[0], persona, {params: params, headers: headers});
	observable.subscribe(success => {}, error => {});
	return observable;
    }

    cancellaPersona(persona: string, utente: string): Observable<{ response: string }> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.delete<{ response: string }>(this.apiUrl + 'remove/' + persona.split("@")[0], {params: params, headers: headers});
    }

    logout(): Observable<{ response: boolean }> {
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!);
        return this.http.delete<{ response: boolean }>(this.apiUrl + 'logout', {params: params});
    }

}
