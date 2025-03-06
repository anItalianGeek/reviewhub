import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Sportello} from '../models/Sportello';
import {Observable} from 'rxjs';
import {Iscrizione} from '../models/Iscrizione';

@Injectable({
    providedIn: 'root'
})
export class SportelloService {

    private readonly apiUrl: string = 'https://reviewhub.chilesotti.it:8888/sportello/';

    constructor(private http: HttpClient) {
    }

    getAllSportelli(utente: string): Observable<Sportello[]> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.get<Sportello[]>(this.apiUrl + 'all', {params: params, headers: headers});
    }

    getSportelloById(id: number, utente: string): Observable<{ sportellos: Sportello[], iscritti: Iscrizione[] }> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.get<{ sportellos: Sportello[], iscritti: Iscrizione[] }>(this.apiUrl + '' + id, {params: params, headers: headers});
    }

    getSportelliDisponibili(utente: string): Observable<Sportello[]> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.get<Sportello[]>(this.apiUrl + 'available', {params: params, headers: headers});
    }

    getSportelliPrenotati(utente: string): Observable<Sportello[]> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.get<Sportello[]>(this.apiUrl + 'subscribed', {params: params, headers: headers});
    }

    getSportelliBy(teacherUsername: string, utente: string): Observable<{ sportellos: Sportello[], iscritti: Iscrizione[] }> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.get<{ sportellos: Sportello[], iscritti: Iscrizione[] }>(this.apiUrl + 'by/' + teacherUsername, {params: params, headers: headers});
    }

    creaSportello(sportello: Sportello, utente: string): Observable<{ response: string }> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.post<{ response: string }>(this.apiUrl + 'create', sportello, {params: params, headers: headers});
    }

    iscriviAlloSportello(id: number, utente: string): Observable<string> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.post<string>(this.apiUrl + 'subscribe/' + id, null, {params: params, headers: headers});
    }

    disicriviDalloSportello(id: number, utente: string): Observable<string> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.delete<string>(this.apiUrl + 'unsubscribe/' + id, {params: params, headers: headers});
    }

    rimuoviIscritto(id: number, utenteDaCancellare: string, utente: string): Observable<{ response: string }> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.delete<{ response: string }>(this.apiUrl + id + '/remove-subscription/' + utenteDaCancellare.split("@")[0], {params: params, headers: headers});
    }

    cancellaSportello(id: number, utente: string): Observable<{ response: string }> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.delete<{ response: string }>(this.apiUrl + 'remove/' + id, {params: params, headers: headers});
    }

    modificaSportello(sportello: Sportello, utente: string): Observable<Sportello> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', utente);
        return this.http.put<Sportello>(this.apiUrl + 'modify/' + sportello.id_sportello, sportello, {params: params, headers: headers});
    }

}
