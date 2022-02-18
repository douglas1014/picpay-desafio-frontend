import { FormGroup } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

export class Utils {
    /**
     * Função para preencher os campos
     * @param obj variavel que recebe os dados da requisição
     * @param form variavel que traz o form group
     */
    static pathValueForm(obj: any, form: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            if (obj[key]) {
                form.controls[key].patchValue(obj[key]);
            }
        });
    }

    /**
     * Função para converter data
     * @param date 
     * @returns data formatada
     */
    static convertDate(date: string | Date): string {
        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        let data = new Date(date);
        return (data.getDate() + " " + meses[(data.getMonth())] + " " + data.getFullYear());
    }

    /**
     * Função para converter data
     * @param date 
     * @returns data formatada
     */
    static convertDateDMY(date: string | Date): string {
        let data = new Date(date);
        console.log(data);
        return (data.getDate() + " " + data.getMonth() + " " + data.getFullYear());
    }

    /**
     * Função para converter horas
     * @param hours 
     * @returns hora formatada
     */
    static convertHour(date: string | Date): string {
        let data = new Date(date);
        return  data.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }
    /**
     * Função para formatar valor monetario
     * @param value 
     * @returns 
     */
    static formatMoney(value: string): string {
      return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    static openModal(modalService: NgbModal, component: any, size: string = 'md'): NgbModalRef {
        return modalService.open(component, 
            { backdrop: 'static', size, keyboard: false, windowClass: 'modal-custom-' + size});
    }
}