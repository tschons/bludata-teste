export class Telefone{

    id:Number;
    numero:string;
    forn_id:Number;

    constructor(
        id:Number,
        numero:string,
        forn_id:Number
    ){
        this.id = id;
        this.numero = numero;
        this.forn_id = forn_id;
    }
}