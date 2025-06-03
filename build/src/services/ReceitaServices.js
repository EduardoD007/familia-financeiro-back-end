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
const Receita_1 = __importDefault(require("../models/Receita"));
class ReceitaServices {
    getAllReceitas(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Receita_1.default.getAll(where);
        });
    }
    getReceitaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Receita_1.default.getById(id);
        });
    }
    createReceita(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield data.create();
        });
    }
    updateReceita(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Receita_1.default.update(id, data);
        });
    }
    deleteReceita(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Receita_1.default.delete(id);
        });
    }
}
exports.default = ReceitaServices;
