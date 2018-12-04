import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxMaskModule} from 'ngx-mask'
import { FormEmpresaComponent } from './modules/empresa/components/form-empresa/form-empresa.component';
import { ListFornecedorComponent } from './modules/fornecedor/components/list-fornecedor/list-fornecedor.component';
import { FormFornecedorComponent } from './modules/fornecedor/components/form-fornecedor/form-fornecedor.component';
import { ListEmpresaComponent } from './modules/empresa/components/list-empresa/list-empresa.component';
import { TableTelefoneComponent } from './modules/telefone/components/table-telefone/table-telefone.component';
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    FormEmpresaComponent,
    ListFornecedorComponent,
    FormFornecedorComponent,
    ListEmpresaComponent,
    TableTelefoneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    NgxMaskModule.forRoot({dropSpecialCharacters: false})
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
