import * as moment from "moment";

export class PagamentoCreateDto {
    public name: string;
    public username: string
    public title: string;
    public value: string;
    public date: string | Date;
    public isPayed: boolean;

    constructor(object?: any) {
        this.name = object.name;
        this.username = object.username;
        this.title = object.title;
        this.value = object.value;
        this.date = moment(object.date).format();
        this.isPayed = object.isPayed;  
    }
}