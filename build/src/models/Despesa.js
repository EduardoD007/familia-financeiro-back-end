"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Despesa {
    constructor({ despesa_id, tipo, descricao, categoria_id, valor, data_despesa, updatedAt, }) {
        this.despesa_id = despesa_id;
        this.tipo = tipo;
        this.descricao = descricao;
        this.categoria_id = categoria_id;
        this.valor = valor;
        this.data_despesa = data_despesa;
        this.createdAt = new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
exports.default = Despesa;
