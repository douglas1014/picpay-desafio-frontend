export class PagamentosInfoDto {
    public id: number;
    public date: any;
    public image: string;
    public isPayed: boolean;
    public name: string;
    public title: string;
    public username: string;
    public value: string;

    constructor(object?: any) {
        this.id = object.id;
        this.date = object.date;
        this.image = object.image;
        this.isPayed = object.isPayed;
        this.title = object.title;
        this.name = object.name;
        this.username = object.username;
        this.value = object.value;
    }
}