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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Despesa_1 = __importDefault(require("../models/Despesa"));
class DespesaController {
    constructor(repository) {
        this.repository = repository;
        this.repository = repository;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, descricao, categoria_id, data_despesa } = req.query;
            const newQueryString = { tipo, descricao, categoria_id, data_despesa };
            try {
                const registros = yield this.repository.getAll(newQueryString);
                return res.status(200).json(registros);
            }
            catch (error) {
                return res.status(500).json(`${error.message} - Falha ao buscar registros`);
            }
        });
    }
    getDataById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const numericId = Number(id);
            try {
                const response = yield this.repository.getById(numericId);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(500).json(`${error.message} - Falha ao buscar registros`);
            }
        });
    }
    getDataByCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.getByCategoria();
                console.log(response);
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(500).json(`${error.message} - Falha ao buscar registros`);
            }
        });
    }
    getDataSum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.getSomaDespesas();
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(500).json({ error: `Falha ao buscar soma das despesas: ${error.message}` });
            }
        });
    }
    saveData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { despesa_id, tipo, descricao, categoria_id, valor, data_despesa, createdAt, updatedAt } = req.body;
            const newDespesa = new Despesa_1.default({ despesa_id, tipo, descricao, categoria_id, valor, data_despesa, updatedAt });
            try {
                const response = yield this.repository.create(newDespesa);
                if (response === 1) {
                    return res.status(200).json({ message: 'Registro foi criado com sucesso' });
                }
                else {
                    return res.status(500).json({ message: 'Registro não foi criado' });
                }
            }
            catch (error) {
                return res.status(500).json(`${error.message} - Falha ao criar registro`);
            }
        });
    }
    updateData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tipo, descricao, categoria_id, data_despesa, valor, updatedAt } = req.body;
            const newAtualizaDespesa = { tipo, descricao, categoria_id, data_despesa, valor, updatedAt };
            const numericId = Number(id);
            try {
                const response = yield this.repository.update(numericId, newAtualizaDespesa);
                if (response === 0) {
                    return res.status(500).json(`A despesa ${id} nao foi atualizada com sucesso`);
                }
                else {
                    return res.status(500).json(`A despesa ${id} foi atualizada`);
                }
            }
            catch (error) {
                return res.status(500).json(`Erro ao atualizar registro - ${error.message}`);
            }
        });
    }
    deleteData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const numericId = Number(id);
            try {
                const response = yield this.repository.delete(numericId);
                if (response === 0) {
                    return res.status(200).json(`Despesa ${id} não foi excluída`);
                }
                else {
                    return res.status(500).json(`Despesa ${id} foi excluída com sucesso`);
                }
            }
            catch (error) {
                return res.status(500).json(`Erro ao excluir registro - ${error.message}`);
            }
        });
    }
}
exports.default = DespesaController;
