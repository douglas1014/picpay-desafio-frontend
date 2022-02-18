export class PagamentoCreateDto {
    public name: string;
    public title: string;
    public value: string;
    public date: Date;

    constructor(object?: any) {
        this.name = object.name;
        this.title = object.title;
        this.value = object.value;
        this.date = new Date(object.date);
    }
}