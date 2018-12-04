export class FilterFornecedor{

    private _nome:string;
    private _cpf_cnpj:string;
    private _data_cad_ini:string;
    private _data_cad_fim:string;

    constructor(
        nome:string,
        cpf_cnpj:string,
        data_cad_ini:string,
        data_cad_fim:string
    ){
        this._nome = nome;
        this._cpf_cnpj = cpf_cnpj;
        this._data_cad_ini = data_cad_ini;
        this._data_cad_fim = data_cad_fim;
    }

    get nome(): string {
        return this._nome;
    }

    get cpf_cnpj(): string {
        return this._cpf_cnpj;
    }

    get data_cad_ini(): string {
        return this._data_cad_ini;
    }

    get data_cad_fim(): string {
        return this._data_cad_fim;
    }

    set nome(value: string) {
        this._nome = value;
    }

    set cpf_cnpj(value: string) {
        this._cpf_cnpj = value;
    }

    set data_cad_ini(value: string) {
        this._data_cad_ini = value;
    }

    set data_cad_fim(value: string) {
        this._data_cad_fim = value;
    }
}