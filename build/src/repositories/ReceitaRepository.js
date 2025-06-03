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
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1234',
    database: 'financeiro',
    ssl: false
});
class ReceitaRepository {
    getAll(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = pool.connect();
            let query = 'SELECT * FROM receitas';
            if (!Object.values(where).every(element => element === undefined)) { // verifica se todos elementos de uma array atendem uma condição
                query += ' WHERE ';
                for (const key of Object.keys(where)) {
                    if (where[key] !== undefined) {
                        query += ` ${key} = ${where[key]} AND `;
                    }
                }
                query = query.slice(0, -4);
            }
            try {
                const result = (yield cliente).query(query);
                return (yield result).rows;
            }
            catch (error) {
                throw new Error(`Erro ao buscar registros: ${error.message}`);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = pool.connect();
            const query = `SELECT * FROM despesas WHERE receita_id = ${id}`;
            try {
                const categorias = (yield client).query(query);
                return (yield categorias).rows;
            }
            catch (error) {
                throw new Error(`Erro ao buscar registros: ${error.message}`);
            }
        });
    }
    getByCategoria() {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = pool.connect();
            const query = `SELECT categorias.descricao, SUM(receitas.valor) AS total_produtos FROM receitas 
    INNER JOIN categorias ON receitas.categoria_id = categorias.categoria_id
    GROUP BY categorias.descricao;`;
            try {
                const despesas = (yield cliente).query(query);
                return (yield despesas).rows;
            }
            catch (error) {
                throw new Error(`Erro ao buscar registros por categoria: ${error.message}`);
            }
        });
    }
    getSomaReceitas() {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = pool.connect();
            try {
                const query = 'SELECT SUM(valor) as total_receitas FROM receitas';
                const response = (yield cliente).query(query);
                return (yield response).rows;
            }
            catch (error) {
                throw new Error(`Erro ao buscar soma dos registros: ${error.message}`);
            }
        });
    }
    create(despesa) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const cliente = pool.connect();
            const query = 'INSERT INTO despesas (tipo, descricao, categoria_id, valor, data_despesa, createdAt, updatedAt) values ($1, $2, $3, $4, $5, $6, $7)';
            try {
                const result = (yield cliente).query(query, [
                    despesa.tipo,
                    despesa.descricao,
                    despesa.categoria_id,
                    despesa.valor,
                    despesa.data_receita,
                    despesa.createdAt,
                    despesa.updatedAt
                ]);
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
            data.updatedAt = new Date();
            const query = `
    UPDATE receitas
    SET tipo = $1, descricao = $2, categoria_id = $3, valor = $4, data_receita = $5, updatedAt = $6
    WHERE receita_id = ${id}
    `;
            try {
                const result = (yield client).query(query, [data.tipo, data.descricao, data.categoria_id, data.valor, data.data_receita, data.updatedAt]);
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
      DELETE FROM receitas
      WHERE despesa_id = ${id}
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
exports.default = ReceitaRepository;
