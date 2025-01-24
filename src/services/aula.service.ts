import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Aula} from '../models/Aula';

@Injectable({
    providedIn: 'root'
})
export class AulaService {

    private readonly apiUrl = 'https://localhost:8888/aula';

    constructor(private http: HttpClient) {
    }

    getTutteAule(): Observable<Aula[]> {
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!);
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        return this.http.get<Aula[]>(this.apiUrl, {headers: headers, params: params});
    }

    aggiungiAula(nuovaAula: Aula): Observable<void> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!);
        return this.http.post<void>(this.apiUrl, nuovaAula, {params: params, headers: headers});
    }

    cambiaAula(aula: Aula): Observable<void> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!);
        return this.http.put<void>(this.apiUrl, aula, {params: params, headers: headers});
    }

    cancellaAula(aula: Aula): Observable<void> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!);
        return this.http.delete<void>(this.apiUrl + "/" + aula.id, {params: params, headers: headers});
    }

}
