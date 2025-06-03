"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1234',
    database: 'financeiro',
    ssl: false
});
class Receita {
    constructor({ receita_id, tipo, descricao, categoria_id, valor, data_receita, updatedAt, }) {
        this.receita_id = receita_id;
        this.tipo = tipo;
        this.descricao = descricao;
        this.categoria_id = categoria_id;
        this.valor = valor;
        this.data_receita = data_receita;
        this.createdAt = new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
exports.default = Receita;
