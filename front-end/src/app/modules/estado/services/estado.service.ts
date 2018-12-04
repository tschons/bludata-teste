import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estado} from "../Estado";
import {environment} from "../../../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class EstadoService {

    constructor(
        private httpClient:HttpClient
    ) { }

    listEstados():Observable<Estado[]>{
        return this.httpClient.get<Estado[]>(environment.apiUrl + '/estado');
    }
}
