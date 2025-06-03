"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DespesaController_1 = __importDefault(require("../controllers/DespesaController"));
const DespesaRepository_1 = __importDefault(require("../repositories/DespesaRepository"));
const despesaRepository = new DespesaRepository_1.default();
const despesaController = new DespesaController_1.default(despesaRepository);
const router = (0, express_1.Router)();
router.get('/despesas', (req, res) => { despesaController.getAll(req, res); });
router.get('/despesas/categoria', (req, res) => { despesaController.getDataByCategoria(req, res); });
router.get('/despesas/soma', (req, res) => { despesaController.getDataSum(req, res); });
router.get('/despesas/:id', (req, res) => { despesaController.getDataById(req, res); });
router.post('/despesas', (req, res) => { despesaController.saveData(req, res); });
router.patch('/despesas/:id', (req, res) => { despesaController.updateData(req, res); });
router.delete('/despesas/:id', (req, res) => { despesaController.deleteData(req, res); });
exports.default = router;
