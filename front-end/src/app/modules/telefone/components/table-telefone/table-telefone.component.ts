import {Component, Input, OnInit} from '@angular/core';
import {Telefone} from "../../Telefone";
import {TelefoneService} from "../../services/telefone.service";

@Component({
    selector: 'app-table-telefone',
    templateUrl: './table-telefone.component.html',
    styleUrls: ['./table-telefone.component.css']
})
export class TableTelefoneComponent implements OnInit {

    successMessage:String = '';
    errorMessage:String = '';
    telefones:Telefone[];
    telefone:Telefone = new Telefone(0, '', 0);

    @Input('fornecedor-id') forn_id:Number = 0;

    constructor(
        private telefoneService:TelefoneService
    ) { }

    ngOnInit() {
        this.loadTelefones();
    }

    loadTelefones(){
        this.telefoneService.listTelefonesForn(this.forn_id).subscribe(telefones => {
            this.telefones = telefones;
        })
    }

    validateForm():string{

        let returnMessage = '';

        if(!this.telefone.numero){
            returnMessage = 'O campo Número é obrigatório';
        }

        return returnMessage;
    }

    saveTelefone(){

        this.errorMessage = '';
        this.successMessage = '';

        let validateMessage = this.validateForm();
        if(validateMessage){
            this.errorMessage = validateMessage;
            return false;
        }

        this.telefone.forn_id = this.forn_id;

        this.telefoneService.createTelefone(this.telefone).subscribe( res => {
            this.successMessage = 'Telefone adicionado com sucesso';

            this.telefone.numero = '';
            this.loadTelefones();
        }, error => {
            this.errorMessage = 'Falha ao adicionar telefone';
        })
    }

    deleteTelefone(id:Number){

        this.errorMessage = '';
        this.successMessage = '';

        this.telefoneService.deleteTelefone(id).subscribe(res => {
            this.successMessage = 'Telefone excluído com sucesso';

            this.loadTelefones();
        }, res => {
            this.errorMessage = 'Falha ao excluir telefone: ' + res.error.message;
        })
    }

}
