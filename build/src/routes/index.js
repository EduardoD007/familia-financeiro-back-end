"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriasRoutes_js_1 = __importDefault(require("./categoriasRoutes.js"));
const despesasRoutes_js_1 = __importDefault(require("./despesasRoutes.js"));
const receitasRoutes_js_1 = __importDefault(require("./receitasRoutes.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json(), categoriasRoutes_js_1.default, despesasRoutes_js_1.default, receitasRoutes_js_1.default);
exports.default = app;
