export class UsuariosInfoDto {
    public id: number;
    public name: number;
    public email: number;

    constructor(object?: any) {
        this.id = object.id;
        this.name = object.name;
        this.email = object.email;
    }
}