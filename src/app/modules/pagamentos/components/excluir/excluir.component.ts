import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PagamentosInfoDto } from 'src/app/core/dtos/pagamentos-info-dto';
import { SweetalertCustom } from 'src/app/shared/shared/utils/sweetalert-custom';
import { PagamentoService } from '../../service/pagamento.service';


@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.scss']
})
export class ExcluirComponent {

 @Input() public dataSource: PagamentosInfoDto;

  constructor(public activeModal: NgbActiveModal, private pagamentoService: PagamentoService) { }

  public delete(item: number): void {
    this.pagamentoService.delete(item).subscribe(() => {
      this.closeModal(true);
      SweetalertCustom.showAlertTimer2('success', 'Operação realizada com sucesso');
    });
  }
  
  public closeModal(item?: boolean) {
    this.activeModal.close(item);
  }
}
