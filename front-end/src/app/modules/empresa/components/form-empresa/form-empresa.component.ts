import { Component, OnInit } from '@angular/core';
import {Estado} from "../../../estado/Estado";
import {Empresa} from "../../Empresa";
import {EstadoService} from "../../../estado/services/estado.service";
import {EmpresaService} from "../../services/empresa.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-form-empresa',
    templateUrl: './form-empresa.component.html',
    styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

    empresa:Empresa = new Empresa(0, 0, '', '');
    estados:Estado[];
    successMessage = '';
    errorMessage = '';

    constructor(
        private empresaService:EmpresaService,
        private estadoService:EstadoService,
        private activatedRoute:ActivatedRoute
    ) { }

    ngOnInit() {

        const routeParams = this.activatedRoute.snapshot.params;

        this.loadEstados();

        if(routeParams.id){
            this.loadEmpresa(routeParams.id);
        }
    }

    loadEstados(){
        this.estadoService.listEstados().subscribe(estados => {
            this.estados = estados;
        })
    }

    loadEmpresa(id:Number){
        this.empresaService.loadEmpresa(id).subscribe(empresa => {
            this.empresa = empresa;

        })
    }

    validateForm():string{

        let fieldsCheck = {
            'Nome': this.empresa.nome_fant,
            'Estado': this.empresa.estado_id,
            'CNPJ': this.empresa.cnpj
        };

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

        this.empresa.id = 0;
        this.empresa.estado_id = 0;
        this.empresa.cnpj = '';
        this.empresa.nome_fant = '';
    }

    save(){
        this.errorMessage = '';
        this.successMessage = '';

        let validateMessage = this.validateForm();
        if(validateMessage){
            this.errorMessage = validateMessage;
            return false;
        }

        if(this.empresa.id === 0){

            this.empresaService.createEmpresa(this.empresa).subscribe(res => {

                this.empresa.id = res.id;
                this.successMessage = 'Empresa cadastrada com sucesso';
            }, res => {
                this.errorMessage = 'Falha ao cadastrar empresa: ' + res.error.message;
            })
        }else{
            this.empresaService.editEmpresa(this.empresa).subscribe(res => {
                this.successMessage = 'Empresa atualizada com sucesso';
            }, res => {
                this.errorMessage = 'Falha ao atualizar empresa: ' + res.error.message;
            });
        }
    }
}
