import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormFornecedorComponent} from "./modules/fornecedor/components/form-fornecedor/form-fornecedor.component";
import {ListFornecedorComponent} from "./modules/fornecedor/components/list-fornecedor/list-fornecedor.component";
import {ListEmpresaComponent} from "./modules/empresa/components/list-empresa/list-empresa.component";
import {FormEmpresaComponent} from "./modules/empresa/components/form-empresa/form-empresa.component";

const routes: Routes = [
  {
    path: '',
    component: ListFornecedorComponent
  },
  {
    path: 'fornecedor',
    component: FormFornecedorComponent
  },
  {
    path: 'fornecedor/:id',
    component: FormFornecedorComponent
  },
  {
    path: 'empresas',
    component: ListEmpresaComponent
  },
  {
    path: 'empresa',
    component: FormEmpresaComponent
  },
  {
    path: 'empresa/:id',
    component: FormEmpresaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
