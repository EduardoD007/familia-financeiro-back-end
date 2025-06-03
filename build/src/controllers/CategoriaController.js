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
const Categoria_js_1 = __importDefault(require("../models/Categoria.js"));
class CategoriaController {
    constructor(repository) {
        this.repository = repository;
        this.repository = repository;
    }
    getAllData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descricao, tipo } = req.query;
            const newQueryString = { descricao, tipo };
            try {
                const response = yield this.repository.getAll(newQueryString);
                return res.status(200).json(response);
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
    saveData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoria_id, descricao, tipo, updatedAt } = req.body;
            const newCategoria = new Categoria_js_1.default({ categoria_id, descricao, tipo, updatedAt });
            try {
                const response = yield this.repository.create(newCategoria);
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
            const { descricao, tipo } = req.body;
            const newAtualizaCategoria = { descricao, tipo };
            const numericId = Number(id);
            try {
                const response = yield this.repository.update(numericId, newAtualizaCategoria);
                if (response === 0) {
                    return res.status(500).json(`A categoria ${id} nao foi atualizada com sucesso`);
                }
                else {
                    return res.status(500).json(`A categoria ${id} foi atualizada com sucesso`);
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
                    return res.status(200).json(`Categoria ${id} não foi excluída`);
                }
                else {
                    return res.status(500).json(`Categoria ${id} foi excluída com sucesso`);
                }
            }
            catch (error) {
                return res.status(500).json(`Erro ao excluir registro - ${error.message}`);
            }
        });
    }
}
exports.default = CategoriaController;
