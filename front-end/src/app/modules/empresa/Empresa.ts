export class Empresa{

    id:Number;
    estado_id:Number;
    nome_fant:String;
    cnpj:String;

    constructor(
        id:Number,
        estado_id:Number,
        nome_fant:String,
        cnpj:String
    ){
        this.id = id;
        this.estado_id = estado_id;
        this.nome_fant = nome_fant;
        this.cnpj = cnpj;
    }
}