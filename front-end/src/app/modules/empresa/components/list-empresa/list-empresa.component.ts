import {Component, OnInit} from '@angular/core';
import {EmpresaService} from "../../services/empresa.service";
import {Empresa} from "../../Empresa";

@Component({
    selector: 'app-list-empresa',
    templateUrl: './list-empresa.component.html',
    styleUrls: ['./list-empresa.component.css']
})
export class ListEmpresaComponent implements OnInit {

    empresas: Empresa[];
    successMessage: String = '';
    errorMessage: String = '';

    constructor(
        private empresaService: EmpresaService
    ) {
    }

    ngOnInit() {

        this.listEmpresas();
    }

    listEmpresas() {
        this.empresaService.listEmpresas().subscribe(empresas => {
            this.empresas = empresas;
        })
    }

    public deleteEmpresa(id: Number) {

        if (confirm('Tem certeza que deseja excluir o registro ' + id + '?')) {
            this.empresaService.deleteEmpresa(id).subscribe(ret => {
                this.successMessage = 'Empresa excluída com sucesso';

                this.listEmpresas();
            }, res => {
                this.errorMessage = 'Falha ao excluir empresa: ' + res.error.message;
            })
        }
    }
}
