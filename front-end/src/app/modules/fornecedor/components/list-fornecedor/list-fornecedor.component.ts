import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Fornecedor } from "../../Fornecedor";
import { FornecedorService } from "../../services/fornecedor.service"
import {FilterFornecedor} from "../../FilterFornecedor";

@Component({
    selector: 'app-list-fornecedor',
    templateUrl: './list-fornecedor.component.html',
    styleUrls: ['./list-fornecedor.component.css']
})
export class ListFornecedorComponent implements OnInit {

    fornecedores:Array<Fornecedor>;
    successMessage:String = '';
    errorMessage:String = '';
    filter: FilterFornecedor = new FilterFornecedor(
        '', '', '', ''
    );

    constructor(
        private fornecedorService:FornecedorService,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {

        this.listFornecedores();
    }

    public listFornecedores(){
        this.fornecedorService.listFornecedores(this.filter).subscribe(fornecedores => {
            this.fornecedores = fornecedores;
        })
    }

    public formatFields(fornecedor:Fornecedor){

        let returnData = [];

        let dataItens = {
            'RG': fornecedor.rg,
            'CPF': fornecedor.cpf,
            'Data de nascimento': this.datePipe.transform(fornecedor.data_nasc, 'dd/MM/yyyy'),
            'CNPJ': fornecedor.cnpj
        };

        for(let item in dataItens) {
            if(dataItens[item]){
                returnData.push(`${item}: ${dataItens[item]}`);
            }
        }

        return returnData.join('<br />');
    }

    public deleteFornecedor(id:Number){
        this.errorMessage = '';
        this.successMessage = '';

        if(confirm('Tem certeza que deseja excluir o registro ' + id + '?')){
            this.fornecedorService.deleteFornecedor(id).subscribe(res => {
                this.successMessage = 'Fornecedor excluído com sucesso';

                this.listFornecedores();
            }, res => {
                this.errorMessage = 'Falha ao excluir fornecedor: ' + res.error.message;
            })
        }
    }
}
