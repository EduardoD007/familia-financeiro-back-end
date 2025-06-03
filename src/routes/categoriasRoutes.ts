import { Router } from "express";
import CategoriaController from '../controllers/CategoriaController.js'
import CategoriaRepository from "../repositories/CategoriaRepository.js";

const categoriaRepository = new CategoriaRepository()
const categoriaController = new CategoriaController(categoriaRepository);

const router = Router();

router.get('/categorias', (req, res) => {categoriaController.getAllData(req, res)});
router.post('/categorias', (req, res) => {categoriaController.saveData(req, res)});
router.patch('/categorias/:id', (req, res) => {categoriaController.updateData(req, res)});
router.delete('/categorias/:id', (req, res) => {categoriaController.deleteData(req, res)});

export default router;