import { Pool } from "pg";
import TypeAtualizaReceitas from "../types/TypeAtualizaReceitas";
import TypeReceitaQueryString from "../types/TypeReceitaQueryString";

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'financeiro',
  ssl: false
})

class Receita {
  receita_id: number;
  tipo: string;
  descricao: string;
  categoria_id: number;
  valor: number;
  data_receita: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    receita_id,
    tipo,
    descricao,
    categoria_id,
    valor,
    data_receita,
    updatedAt,
  }: {
    receita_id: number;
    tipo: string;
    descricao: string;
    categoria_id: number;
    valor: number;
    data_receita: Date;
    updatedAt: Date;
  }
  ) {
    this.receita_id = receita_id;
    this.tipo = tipo;
    this.descricao = descricao;
    this.categoria_id = categoria_id;
    this.valor = valor;
    this.data_receita = data_receita
    this.createdAt = new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

export default Receita;