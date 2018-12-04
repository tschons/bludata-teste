import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Empresa} from "../Empresa";
import {environment} from "../../../../environments/environment.prod";
import {Fornecedor} from "../../fornecedor/Fornecedor";

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    constructor(
        private httpClient:HttpClient
    ) { }

    listEmpresas():Observable<Empresa[]>{
        return this.httpClient.get<Empresa[]>(environment.apiUrl + '/empresa')
    }

    loadEmpresa(id):Observable<Empresa>{
        return this.httpClient.get<Empresa>(environment.apiUrl + '/empresa/' + id)
    }

    editEmpresa(empresa:Empresa):Observable<any>{
        return this.httpClient.put(environment.apiUrl + '/empresa/' + empresa.id, empresa);
    }

    deleteEmpresa(id:Number):Observable<any>{
        return this.httpClient.delete(environment.apiUrl + '/empresa/' + id);
    }

    createEmpresa(empresa:Empresa):Observable<any>{
        return this.httpClient.post(environment.apiUrl + '/empresa', empresa);
    }

}
