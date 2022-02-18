import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { PagamentosInfoDto } from 'src/app/core/dtos/pagamentos-info-dto';
import { Utils } from 'src/app/core/utils/Utils';
import { CadastroComponent } from '../../components/cadastro/cadastro.component';
import { ExcluirComponent } from '../../components/excluir/excluir.component';
import { PagamentoService } from '../../service/pagamento.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss']
})
export class PagamentosComponent implements OnInit {

  public pagamentos: PagamentosInfoDto[] = [];
  public orderItens: string;

  constructor(
    private pagamentoService: PagamentoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll(params?: URLSearchParams ): void {
    this.pagamentoService.getByFilter(params).pipe(map(res => res.map((item) => new PagamentosInfoDto(item)))).subscribe((res) => {
      this.pagamentos = res;
      this.pagamentos.map((res) => {
        res['hours'] = Utils.convertHour(res.date);
      });
    });
  }

  public filter(value?: string, order?: boolean): void {
    const params: URLSearchParams = new URLSearchParams();
    if (value && !order) {
      params.append('name', value);
    }

    if (order) {
      (this.orderItens === 'asc') ? this.orderItens = 'desc' : this.orderItens = 'asc';
      params.append('_sort', value);
      params.append('_order', this.orderItens);
    }
    
    this.getAll(params);
  }

  public remover(item: PagamentosInfoDto): void {
   const modalRef = Utils.openModal(this.modalService, ExcluirComponent, 'lg');
   modalRef.componentInstance.dataSource = item;
   modalRef.result.then(result => {
    if (result) {
      this.getAll();
    }
  });
  }

  public update(item: PagamentosInfoDto): void {
   const modalRef = Utils.openModal(this.modalService, CadastroComponent, 'lg');
   modalRef.componentInstance.dataSource = item;
   item.date = moment(item.date).format('MM/DD/YYYY');
   modalRef.componentInstance.title = 'Atualizar pagamento';
   modalRef.result.then(result => {
    if (result) {
      this.getAll();
    }
  });
  }

  public openModal(): void {
    const modalRef = Utils.openModal(this.modalService, CadastroComponent, 'lg');
    modalRef.componentInstance.title = 'Adicionar pagamento';
    modalRef.result.then(result => {
      if (result) {
        this.getAll();
      }
    });
  }
}
