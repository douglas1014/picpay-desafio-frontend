import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';

import { TableComponent } from './shared/components/table/table.component';
import { AppTableBodyDirective } from './shared/components/table/configs/app-table-body.directive';
import { TemplateModalComponent } from './shared/components/template-modal/template-modal.component';
import { MoneyPipe } from './shared/pipes/money.pipe';


@NgModule({
  declarations: [
    TableComponent,
    AppTableBodyDirective,
    TemplateModalComponent,
    MoneyPipe
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    NgxPaginationModule, 
    TableComponent, 
    AppTableBodyDirective,
    TemplateModalComponent,
    MoneyPipe
  ]
})
export class SharedModule { }
