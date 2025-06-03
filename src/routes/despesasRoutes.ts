import { Router } from "express";
import DespesaController from "../controllers/DespesaController";
import DespesaRepository from '../repositories/DespesaRepository';

const despesaRepository = new DespesaRepository();
const despesaController = new DespesaController(despesaRepository);

const router = Router();

router.get('/despesas', (req, res) => {despesaController.getAll(req, res)});
router.get('/despesas/categoria', (req, res) => {despesaController.getDataByCategoria(req, res)});
router.get('/despesas/soma', (req, res) => {despesaController.getDataSum(req, res)});
router.get('/despesas/:id', (req, res) => {despesaController.getDataById(req, res)});
router.post('/despesas', (req, res) => {despesaController.saveData(req, res)});
router.patch('/despesas/:id', (req, res) => {despesaController.updateData(req, res)});
router.delete('/despesas/:id', (req, res) => {despesaController.deleteData(req, res)});


export default router;