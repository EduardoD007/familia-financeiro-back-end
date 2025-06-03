import { Pool } from "pg";
import InterfaceReceitaReposityory from "./interfaces/InterfaceReceitaRepository";
import TypeReceitaQueryString from "../types/TypeReceitaQueryString";
import Receita from "../models/Receita";
import TypeAtualizaReceitas from "../types/TypeAtualizaReceitas";

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'financeiro',
  ssl: false
})

class ReceitaRepository implements InterfaceReceitaReposityory {

   async getAll(where: TypeReceitaQueryString) {
    const cliente = pool.connect();

    let query = 'SELECT * FROM receitas';

    if (!Object.values(where).every(element => element === undefined)) { // verifica se todos elementos de uma array atendem uma condição
      query += ' WHERE ';
      for (const key of Object.keys(where) as (keyof TypeReceitaQueryString)[]) {
        if (where[key] !== undefined) {
          query += ` ${key} = ${where[key]} AND `;
        }
      }

      query = query.slice(0, -4);
    }

    try {
      const result = (await cliente).query(query);
      return (await result).rows;
    } catch (error) {
      throw new Error(`Erro ao buscar registros: ${error.message}`);
    }
  }

  async getById(id: number) {
    const client = pool.connect();

    const query = `SELECT * FROM despesas WHERE receita_id = ${id}`;

    try {
      const categorias = (await client).query(query);
      return (await categorias).rows;
    } catch (error) {
      throw new Error(`Erro ao buscar registros: ${error.message}`);
    }
  }

  async getByCategoria() {
    const cliente = pool.connect();

    const query = `SELECT categorias.descricao, SUM(receitas.valor) AS total_produtos FROM receitas 
    INNER JOIN categorias ON receitas.categoria_id = categorias.categoria_id
    GROUP BY categorias.descricao;`

    try {
      const despesas = (await cliente).query(query);
      return (await despesas).rows
    } catch (error) {
      throw new Error(`Erro ao buscar registros por categoria: ${error.message}`);
    }
  }

  async getSomaReceitas() {
    const cliente = pool.connect();

    try {
      const query = 'SELECT SUM(valor) as total_receitas FROM receitas';
      const response = (await cliente).query(query);
      return (await response).rows;
    } catch (error) {
      throw new Error(`Erro ao buscar soma dos registros: ${error.message}`);
    }
  }

  async create(despesa: Receita) {
    const cliente = pool.connect();

    const query = 'INSERT INTO despesas (tipo, descricao, categoria_id, valor, data_despesa, createdAt, updatedAt) values ($1, $2, $3, $4, $5, $6, $7)'

    try {
      const result = (await cliente).query(query, [
        despesa.tipo,
        despesa.descricao,
        despesa.categoria_id,
        despesa.valor,
        despesa.data_receita,
        despesa.createdAt,
        despesa.updatedAt
      ]);
      return (await result).rowCount ?? 0
    } catch (error) {
      throw new Error(`Erro ao inserir registros: ${error.message}`);
    }
  }

  async update(id: number, data: TypeAtualizaReceitas) {
    const client = pool.connect();
    data.updatedAt = new Date();

    const query = `
    UPDATE receitas
    SET tipo = $1, descricao = $2, categoria_id = $3, valor = $4, data_receita = $5, updatedAt = $6
    WHERE receita_id = ${id}
    `
    try {
      const result = (await client).query(query, [data.tipo, data.descricao, data.categoria_id, data.valor, data.data_receita, data.updatedAt])
      return (await result).rowCount ?? 0
    } catch (error) {
      throw new Error(`Erro ao atualizar registros: ${error.message}`);
    }
  }

  async delete(id: number) {
    const client = pool.connect()

    const query = `
      DELETE FROM receitas
      WHERE despesa_id = ${id}
    `
    try {
      const result = (await client).query(query)
      return (await result).rowCount ?? 0
    } catch (error) {
      throw new Error(`Erro ao excluir registros: ${error.message}`);
    }
  }
}

export default ReceitaRepository;