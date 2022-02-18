import * as moment from "moment";

export class PagamentoUpdateDto {
    public id: string;
    public name: string;
    public title: string;
    public value: string;
    public date: string | Date;

    constructor(object?: any) {
        this.id = object.id;
        this.name = object.name;
        this.title = object.title;
        this.value = object.value;
        this.date = moment(object.date).format() 
    }
}