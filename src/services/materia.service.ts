import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Aula} from '../models/Aula';
import {Materia} from '../models/Materia';
import {Enviroment} from '../Enviroment';

@Injectable({
    providedIn: 'root'
})
export class MateriaService {

    private readonly apiUrl = Enviroment.API_URL + 'materia';

    constructor(private http: HttpClient) {
    }

    getTutteMaterie(offset: number, limit: number = 20): Observable<Materia[]> {
        let params = new HttpParams().set('author', localStorage.getItem('auth-id')!).set('offset', offset.toString()).set('limit', limit.toString());
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
