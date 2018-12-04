import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Fornecedor} from "../../Fornecedor";
import {FornecedorService} from "../../services/fornecedor.service";
import {Empresa} from "../../../empresa/Empresa";
import {EmpresaService} from "../../../empresa/services/empresa.service";

@Component({
    selector: 'app-form-fornecedor',
    templateUrl: './form-fornecedor.component.html',
    styleUrls: ['./form-fornecedor.component.css']
})
export class FormFornecedorComponent implements OnInit {

    fornecedor:Fornecedor = new Fornecedor(0, '', null, 0, 'F','', null, '', '');
    empresas:Empresa[];
    successMessage:String = '';
    errorMessage:String = '';

    constructor(
        private fornecedorService:FornecedorService,
        private empresaService:EmpresaService,
        private activatedRoute: ActivatedRoute
    ) {

    }

    ngOnInit() {
        const routeParams = this.activatedRoute.snapshot.params;

        this.fornecedor.id = routeParams.id;
        this.loadEmpresas();

        if(routeParams.id){
            this.loadFornecedor(routeParams.id);
        }
    }

    loadEmpresas(){
        this.empresaService.listEmpresas().subscribe(empresas => {
            this.empresas = empresas;
        })
    }

    loadFornecedor(id:Number){
        this.fornecedorService.loadFornecedor(id).subscribe(fornecedor => {

            this.fornecedor = fornecedor;

        })
    }

    isFisica(){
        return this.fornecedor.tipo == Fornecedor.tipoFisica;
    }

    isJuridica(){
        return this.fornecedor.tipo == Fornecedor.tipoJuridica;
    }

    validateForm():string{

        let fieldsCheck = {
            'Nome': this.fornecedor.nome,
            'Empresa': this.fornecedor.emp_id
        };

        switch (this.fornecedor.tipo) {
            case Fornecedor.tipoFisica:
                fieldsCheck['RG'] = this.fornecedor.rg;
                fieldsCheck['Data de Nascimento'] = this.fornecedor.data_nasc;
                fieldsCheck['CPF'] = this.fornecedor.cpf;

                break;

            case Fornecedor.tipoJuridica:
                fieldsCheck['CNPJ:'] = this.fornecedor.cnpj;
                break;
        }

        let emptyFields = [];
        for (let field in fieldsCheck) {
            if(!fieldsCheck[field]){
                emptyFields.push(field);
            }
        }

        let returnMessage = '';
        if(emptyFields.length == 1){
            returnMessage = `O campo ${emptyFields[0]} é obrigatório`;
        }else if(emptyFields.length > 1){
            returnMessage = `Os campos ${emptyFields.join(', ')} são obrigatórios`;
        }

        return returnMessage;
    }

    clearForm(){
        this.errorMessage = '';
        this.successMessage = '';

        this.fornecedor.id = 0;
        this.fornecedor.nome = '';
        this.fornecedor.data_cad = null;
        this.fornecedor.emp_id = 0;
        this.fornecedor.tipo = 'F';
        this.fornecedor.rg = '';
        this.fornecedor.data_nasc = null;
        this.fornecedor.cpf= '';
        this.fornecedor.cnpj= '';
    }

    save(){
        this.errorMessage = '';
        this.successMessage = '';

        let validateMessage = this.validateForm();
        if(validateMessage){
            this.errorMessage = validateMessage;
            return false;
        }

        if(!this.fornecedor.id){
            this.fornecedorService.createFornecedor(this.fornecedor).subscribe(res => {

                this.fornecedor.id = res.id;
                this.successMessage = 'Fornecedor cadastrado com sucesso';
            }, res => {
                this.errorMessage = 'Falha ao cadastrar fornecedor: ' + res.error.message;
            })

        }else{
            this.fornecedorService.editFornecedor(this.fornecedor).subscribe(res => {
                this.successMessage = 'Fornecedor atualizado com sucesso';
            }, res => {
                this.errorMessage = 'Falha ao atualizar fornecedor: ' + res.error.message;
            });
        }
    }
}
