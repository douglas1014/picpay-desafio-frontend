import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";

export class LoginForm extends FormGroup {
    
    private _errorMessages = {
        required: 'O campo %s é obrigatório.',
        email: 'Digite um email valido'
    };

    constructor() {
        super({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required])
        });
    }

    public get email(): AbstractControl {
        return this.get('email');
    }

    public get password(): AbstractControl {
        return this.get('password');
    }
  
    public markAllAsTouched(): void {
        Object.keys(this.controls).map((control) => this.get(control).markAsDirty());
    }

    public getFirstErrorFrom(controlName: string, label: string): string {
        return this._errorMessages[Object.keys(this.get(controlName).errors)[0]].replace('%s', label || controlName);
    }
}
