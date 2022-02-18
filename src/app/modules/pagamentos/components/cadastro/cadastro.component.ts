import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PagamentosInfoDto } from 'src/app/core/dtos/pagamentos-info-dto';
import { Utils } from 'src/app/core/utils/Utils';
import { SweetalertCustom } from 'src/app/shared/shared/utils/sweetalert-custom';
import { PagamentoService } from '../../service/pagamento.service';
import { CadastroForm } from './cadastro-form';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @Input() public dataSource: PagamentosInfoDto;
  @Input() public title: string;
  public inputType: string;
  private _form: CadastroForm;

  public get form(): CadastroForm {
    return this._form;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private pagamentoService: PagamentoService
  ) {
    this._form = new CadastroForm();
  }

  ngOnInit(): void {
    if (this.dataSource) {
      console.log(new Date(this.dataSource.date));
      Utils.pathValueForm(this.dataSource, this.form);
    }
  }

  public mask(value): string {
    return Utils.formatMoney(value)
  }

  public closeModal(value?: boolean) {
    this.activeModal.close(value);
  }

  public submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      if (this.form.id.value) {
        this.update();
        return;
      }
      this.create();
    }
  }

  public update(): void {
    this.pagamentoService.put(this.form.id.value, this.form.getDadosEnvioUpdate()).subscribe((res) => {
      SweetalertCustom.showAlertTimer2('success', 'Operação realizada com sucesso');
      this.closeModal(true)
    })
  }

  public create(): void {
    this.pagamentoService.post(this.form.getDadosEnvioCreate()).subscribe((res) => {
      SweetalertCustom.showAlertTimer2('success', 'Operação realizada com sucesso');
      this.closeModal(true)
    })
  }

  public isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).dirty;
  }

  public dateText(): void {
    (this.inputType === 'date') ?  this.inputType = 'text' :  this.inputType = 'date';
  }

  public textDate(): void {
    this.inputType = 'text'
  }
}
