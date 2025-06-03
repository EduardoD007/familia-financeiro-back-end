"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "financeiro",
    ssl: false,
});
class CategoriaRepository {
    // Busca todas as categorias se receber todos objeto com valores = undefined
    // Se receber um objeto com pelo menos um valor !== undefined adiciona na string para passar ao postgres
    getAll(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = pool.connect();
            let query = `SELECT * FROM categorias`;
            if (where.descricao !== undefined || where.tipo !== undefined) {
                query += ' WHERE ';
                if (where.descricao !== undefined) {
                    query += `descricao = ${where.descricao} AND `;
                }
                if (where.tipo !== undefined) {
                    query += `tipo = ${where.tipo}`;
                }
                else {
                    query = query.slice(0, -4);
                }
                ;
            }
            try {
                const categorias = (yield client).query(query);
                return (yield categorias).rows;
            }
            catch (error) {
                throw new Error(`Erro ao buscar registros: ${error.message}`);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = pool.connect();
            const query = `SELECT * FROM categorias WHERE categoria_id = ${id}`;
            try {
                const categorias = (yield client).query(query);
                return (yield categorias).rows;
            }
            catch (error) {
                throw new Error(`Erro ao buscar registros: ${error.message}`);
            }
        });
    }
    //Grava uma categoria no banco de dados postgres
    create(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const client = pool.connect();
            const query = `INSERT INTO categorias (descricao, tipo, createdAt, updatedAt) VALUES ($1, $2, $3, $4)`;
            try {
                const result = (yield client).query(query, [categoria.descricao, categoria.tipo, categoria.createdAt, categoria.updatedAt]);
                return (_a = (yield result).rowCount) !== null && _a !== void 0 ? _a : 0;
            }
            catch (error) {
                throw new Error(`Erro ao inserir registros: ${error.message}`);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const client = pool.connect();
            const dataUpdate = new Date();
            const query = `
    UPDATE categorias
    SET descricao = $1, tipo = $2, updatedAt = $3
    WHERE categoria_id = ${id}
    `;
            try {
                const result = (yield client).query(query, [data.descricao, data.tipo, dataUpdate]);
                console.log(yield result);
                return (_a = (yield result).rowCount) !== null && _a !== void 0 ? _a : 0;
            }
            catch (error) {
                throw new Error(`Erro ao atualizar registros: ${error.message}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const client = pool.connect();
            const query = `
      DELETE FROM categorias
      WHERE categoria_id = ${id}
    `;
            try {
                const result = (yield client).query(query);
                return (_a = (yield result).rowCount) !== null && _a !== void 0 ? _a : 0;
            }
            catch (error) {
                throw new Error(`Erro ao excluir registros: ${error.message}`);
            }
        });
    }
}
exports.default = CategoriaRepository;
