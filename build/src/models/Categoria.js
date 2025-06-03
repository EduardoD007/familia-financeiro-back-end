"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Categoria {
    constructor({ categoria_id, descricao, tipo, updatedAt }) {
        this.categoria_id = categoria_id;
        this.descricao = descricao;
        this.tipo = tipo;
        this.createdAt = new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
exports.default = Categoria;
