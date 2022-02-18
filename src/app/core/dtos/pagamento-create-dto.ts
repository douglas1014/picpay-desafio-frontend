import * as moment from "moment";

export class PagamentoCreateDto {
    public name: string;
    public title: string;
    public value: string;
    public date: string | Date;

    constructor(object?: any) {
        this.name = object.name;
        this.title = object.title;
        this.value = object.value;
        this.date = moment(object.date).format()      
    }
}