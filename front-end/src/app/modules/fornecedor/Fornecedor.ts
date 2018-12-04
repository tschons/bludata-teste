export class Fornecedor{
    static tipoFisica = 'F';
    static tipoJuridica = 'J';

    id:Number;
    nome:String;
    data_cad:Date;
    emp_id:Number;
    tipo:String;
    rg:String;
    data_nasc:Date;
    cpf:String;
    cnpj:String;

    constructor(
        id:Number,
        nome:String,
        data_cad:Date,
        emp_id:Number,
        tipo:String,
        rg:String,
        data_nasc:Date,
        cpf:String,
        cnpj:String
    ){
        this.id = id;
        this.nome = nome;
        this.data_cad = data_cad;
        this.emp_id = emp_id;
        this.tipo = tipo;
        this.rg = rg;
        this.data_nasc = data_nasc;
        this.cpf = cpf;
        this.cnpj = cnpj;
    }
}