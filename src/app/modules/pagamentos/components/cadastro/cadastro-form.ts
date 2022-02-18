import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { PagamentoCreateDto } from "src/app/core/dtos/pagamento-create-dto";
import { PagamentoUpdateDto } from "src/app/core/dtos/pagamento-update-dto";

export class CadastroForm  extends FormGroup {
    
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
    };

    constructor() {
        super({
            id: new FormControl(null),
            name: new FormControl(null, [Validators.required]),
            username: new FormControl(null, [Validators.required]),
            value: new FormControl(null, [Validators.required]),
            date: new FormControl(null, [Validators.required]),
            title: new FormControl(null),
            isPayed: new FormControl(null),
        });
    }

    public get id(): AbstractControl {
        return this.get('id');
    }

    public get name(): AbstractControl {
        return this.get('name');
    }

    public get username(): AbstractControl {
        return this.get('username');
    }

    public get valor(): AbstractControl {
        return this.get('value');
    }

    public get date(): AbstractControl {
        return this.get('date');
    }

    public get title(): AbstractControl {
        return this.get('title');
    }

    public get isPayed(): AbstractControl {
        return this.get('isPayed');
    }
  
    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsDirty());
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }

    public getDadosEnvioCreate(): PagamentoCreateDto {
        return new PagamentoCreateDto(this.value);
    }

    public getDadosEnvioUpdate(): PagamentoUpdateDto {
        return new PagamentoUpdateDto(this.value);
    }
}