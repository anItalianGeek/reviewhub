import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Aula} from '../models/Aula';
import {Materia} from '../models/Materia';

@Injectable({
    providedIn: 'root'
})
export class MateriaService {

    private readonly apiUrl = 'https://reviewhub.chilesotti.it:8888/materia';

    constructor(private http: HttpClient) {
    }

    getTutteMaterie(): Observable<Materia[]> {
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!);
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        return this.http.get<Materia[]>(this.apiUrl, {headers: headers, params: params});
    }

    aggiungiMateria(nuovaMateria: Materia): Observable<void> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!);
        return this.http.post<void>(this.apiUrl, nuovaMateria, {params: params, headers: headers});
    }

    cambiaMateria(materia: Materia): Observable<void> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!);
        return this.http.put<void>(this.apiUrl, materia, {params: params, headers: headers});
    }

    cancellaMateria(materia: Materia): Observable<void> {
        let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('auth-token')});
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!);
        return this.http.delete<void>(this.apiUrl + "/" + materia.nome, {params: params, headers: headers});
    }

}
