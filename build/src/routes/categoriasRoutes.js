"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriaController_js_1 = __importDefault(require("../controllers/CategoriaController.js"));
const CategoriaRepository_js_1 = __importDefault(require("../repositories/CategoriaRepository.js"));
const categoriaRepository = new CategoriaRepository_js_1.default();
const categoriaController = new CategoriaController_js_1.default(categoriaRepository);
const router = (0, express_1.Router)();
router.get('/categorias', (req, res) => { categoriaController.getAllData(req, res); });
router.post('/categorias', (req, res) => { categoriaController.saveData(req, res); });
router.patch('/categorias/:id', (req, res) => { categoriaController.updateData(req, res); });
router.delete('/categorias/:id', (req, res) => { categoriaController.deleteData(req, res); });
exports.default = router;
