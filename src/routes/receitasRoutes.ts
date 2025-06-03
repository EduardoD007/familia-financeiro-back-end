import { Router } from "express";
import ReceitaController from "../controllers/ReceitaController";
import ReceitaRepository from "../repositories/ReceitaRepository";

const receitaRepository = new ReceitaRepository();
const receitaController = new ReceitaController(receitaRepository);

const router = Router();

router.get('/receitas', (req, res) => {receitaController.getAll(req, res)});
router.get('/receitas/categoria', (req, res) => {receitaController.getDataByCategoria(req, res)});
router.get('/receitas/soma', (req, res) => {receitaController.getDataSum(req, res)});
router.get('/receitas/:id', (req, res) => {receitaController.getDataById(req, res)});
router.post('/receitas', (req, res) => {receitaController.saveData(req, res)});
router.patch('/receitas/:id', (req, res) => {receitaController.updateData(req, res)});
router.delete('/receitas/:id', (req, res) => {receitaController.deleteData(req, res)});


export default router;