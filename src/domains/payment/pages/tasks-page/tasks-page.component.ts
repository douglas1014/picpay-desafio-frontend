import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentsService } from 'src/domains/payment/services/PaymentService';
import { ModalComponent, PaymentAction } from 'src/domains/payment/components/modal/modal.component';
import { Payment } from 'src/domains/payment/models/Payment';
import { formatDate, formatCurrency } from 'src/domains/payment/utils/format';

interface HandleablePayment {
  payment: Payment
  action: PaymentAction
}

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
})

export class TasksPageComponent implements OnInit {
  constructor(
    private paymentsService: PaymentsService,
    public dialog: MatDialog
  ) { }

  public paymentsData: Payment[] = []

  ngOnInit(): void {
    this.paymentsService.getPayments().subscribe((paymentsList: Payment[]) => {
      return this.paymentsData = paymentsList.map(payment => this.formatPayment(payment))
    })
  }

  public onAddPayment(): void {
    this.openModal('Adicionar pagamento', null, PaymentAction.Save)
  }

  public onEditPayment(paymentToBeEdited: Payment): void {
    this.openModal('Editar pagamento', paymentToBeEdited, PaymentAction.Edit)
  }

  public onDeletePayment(paymentToBeDeleted: Payment): void {
    this.openModal('Excluir pagamento', paymentToBeDeleted, PaymentAction.Delete)
  }

  private addPayment(newPayment: Payment): void {
    this.paymentsService.postPayment(newPayment).subscribe((payments) => {
      console.log(payments)
    })
  }

  public updatePayment(paymentToBeEdited: Payment): void {
    this.paymentsService.updatePayment(paymentToBeEdited).subscribe()
  }

  private deletePayment(paymentToBeDeleted: Payment): void {
    this.paymentsService.deletePayment(paymentToBeDeleted).subscribe()
  }

  private openModal(title: string, payment: Payment | null, action: PaymentAction): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title,
        payment,
        action,
      },
      width: '600px',
    })

    dialogRef.afterClosed().subscribe((result: HandleablePayment | null) => {
      this.handleDialogResponse(result)
    })
  }

  private formatPayment(payment: Payment): Payment {
    return {
      ...payment,
      value: formatCurrency(payment.value),
      date: formatDate(payment.date),
    }
  }

  private handleDialogResponse(response: HandleablePayment | null): void {
    if (!response) { return; }

    if (response.action === PaymentAction.Save) this.addPayment(response.payment)
    if (response.action === PaymentAction.Edit) this.updatePayment(response.payment)
    if (response.action === PaymentAction.Delete) this.deletePayment(response.payment)
  }
}