import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { USUARIOS_ROUTES } from './usuarios-routing.module';
import { UsuariosComponent } from './page/usuarios.component';



@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(USUARIOS_ROUTES),
    HttpClientModule,
    NgxPaginationModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule
  ]
})
export class UsuariosModule { }
