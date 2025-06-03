import express from "express";
import categorias from './categoriasRoutes.js'
import despesas from './despesasRoutes.js'
import receitas from './receitasRoutes.js'


const app = express();

app.use(
  express.json(),
  categorias,
  despesas,
  receitas
)

export default app;