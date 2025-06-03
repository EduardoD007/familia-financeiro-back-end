"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReceitaController_1 = __importDefault(require("../controllers/ReceitaController"));
const ReceitaRepository_1 = __importDefault(require("../repositories/ReceitaRepository"));
const receitaRepository = new ReceitaRepository_1.default();
const receitaController = new ReceitaController_1.default(receitaRepository);
const router = (0, express_1.Router)();
router.get('/receitas', (req, res) => { receitaController.getAll(req, res); });
router.get('/receitas/categoria', (req, res) => { receitaController.getDataByCategoria(req, res); });
router.get('/receitas/soma', (req, res) => { receitaController.getDataSum(req, res); });
router.get('/receitas/:id', (req, res) => { receitaController.getDataById(req, res); });
router.post('/receitas', (req, res) => { receitaController.saveData(req, res); });
router.patch('/receitas/:id', (req, res) => { receitaController.updateData(req, res); });
router.delete('/receitas/:id', (req, res) => { receitaController.deleteData(req, res); });
exports.default = router;
