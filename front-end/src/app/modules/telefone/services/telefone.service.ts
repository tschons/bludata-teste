import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Telefone} from "../Telefone";
import {environment} from "../../../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class TelefoneService {

    constructor(
        private httpClient:HttpClient
    ) { }

    listTelefonesForn(fornId:Number):Observable<Telefone[]>{
        return this.httpClient.get<Telefone[]>(environment.apiUrl + '/telefone/fornecedor/' + fornId)
    }

    createTelefone(telefone:Telefone):Observable<any>{
        return this.httpClient.post(environment.apiUrl + '/telefone', telefone);
    }

    deleteTelefone(id:Number):Observable<any>{
        return this.httpClient.delete(environment.apiUrl + '/telefone/' + id)
    }
}
