import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { PagamentosComponent } from './page/pagamentos/pagamentos.component';
import { PAGAMENTOS_ROUTES } from './pagamentos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ExcluirComponent } from './components/excluir/excluir.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  declarations: [PagamentosComponent, CadastroComponent, ExcluirComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PAGAMENTOS_ROUTES),
    HttpClientModule,
    NgxPaginationModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule
  ],
  exports: [NgxPaginationModule]
})
export class PagamentosModule { }
