import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment.prod"
import { Fornecedor } from "../Fornecedor";
import {FilterFornecedor} from "../FilterFornecedor";

@Injectable({
    providedIn: 'root'
})
export class FornecedorService {

    constructor(
        private httpClient:HttpClient
    ) { }

    listFornecedores(filter: FilterFornecedor):Observable<Fornecedor[]>{
        let params = new HttpParams();

        params = params.append('nome', filter.nome);
        params = params.append('cpf_cnpj', filter.cpf_cnpj);

        if(filter.data_cad_ini != ''){
            typeof filter.data_cad_ini;
            params = params.append('data_cad_ini', new Date(filter.data_cad_ini).toISOString());
        }

        if(filter.data_cad_fim != ''){
            console.log(filter.data_cad_fim);
            params = params.append('data_cad_fim', new Date(filter.data_cad_fim).toISOString());
        }

        return this.httpClient.get<Fornecedor[]>(environment.apiUrl + '/fornecedor', { params: params });
    }

    loadFornecedor(id):Observable<Fornecedor>{
        return this.httpClient.get<Fornecedor>(environment.apiUrl + '/fornecedor/' + id)
    }

    editFornecedor(fornecedor:Fornecedor):Observable<any>{
        return this.httpClient.put(environment.apiUrl + '/fornecedor/' + fornecedor.id, fornecedor);
    }

    createFornecedor(fornecedor:Fornecedor):Observable<any>{
        return this.httpClient.post(environment.apiUrl + '/fornecedor', fornecedor);
    }

    deleteFornecedor(id:Number):Observable<any>{
        return this.httpClient.delete(environment.apiUrl + '/fornecedor/' + id);
    }
}
