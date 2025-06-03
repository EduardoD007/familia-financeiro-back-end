import { Pool } from "pg";
import InterfaceCategoriaReposityory from "./interfaces/InterfaceCategoriaRepository";
import TypeCategoriaQueryString from "../types/TypeCategoriaQueryString";
import Categoria from "../models/Categoria";
import TypeAtualizaCategoria from "../types/TypeAtualizaCategoria";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "financeiro",
  ssl: false,
});


class CategoriaRepository implements InterfaceCategoriaReposityory {

   // Busca todas as categorias se receber todos objeto com valores = undefined
  // Se receber um objeto com pelo menos um valor !== undefined adiciona na string para passar ao postgres
  async getAll(where: TypeCategoriaQueryString) {
    const client = pool.connect();

    let query = `SELECT * FROM categorias`;

    if (where.descricao !== undefined || where.tipo !== undefined) {
      query += ' WHERE ';

      if (where.descricao !== undefined) {
        query += `descricao = ${where.descricao} AND `;
      }

      if (where.tipo !== undefined) {
        query += `tipo = ${where.tipo}`;
      }else{
        query = query.slice(0,-4);
      };
    }

    try {
      const categorias = (await client).query(query);
      return (await categorias).rows;
    } catch (error) {
      throw new Error(`Erro ao buscar registros: ${error.message}`);
    }
  }

  async getById(id: number) {
    const client = pool.connect();

    const query = `SELECT * FROM categorias WHERE categoria_id = ${id}`;

    try {
      const categorias = (await client).query(query);
      return (await categorias).rows;
    } catch (error) {
      throw new Error(`Erro ao buscar registros: ${error.message}`);
    }
  }

  //Grava uma categoria no banco de dados postgres
  async create(categoria: Categoria): Promise<number> {
    const client = pool.connect();

    const query = `INSERT INTO categorias (descricao, tipo, createdAt, updatedAt) VALUES ($1, $2, $3, $4)`;

    try {
      const result = (await client).query(query, [categoria.descricao, categoria.tipo, categoria.createdAt, categoria.updatedAt]);
      return (await result).rowCount?? 0;
    } catch (error) {
      throw new Error(`Erro ao inserir registros: ${error.message}`);
    }
  }

  async update(id: number, data: TypeAtualizaCategoria) {
    const client = pool.connect();
    const dataUpdate = new Date();

    const query = `
    UPDATE categorias
    SET descricao = $1, tipo = $2, updatedAt = $3
    WHERE categoria_id = ${id}
    `
    try {
      const result = (await client).query(query, [data.descricao, data.tipo, dataUpdate])
      console.log(await result)
      return (await result).rowCount?? 0;
    } catch (error) {
      throw new Error(`Erro ao atualizar registros: ${error.message}`);
    }
  }

  async delete(id: number) {
    const client = pool.connect()

    const query = `
      DELETE FROM categorias
      WHERE categoria_id = ${id}
    `
    try {
      const result = (await client).query(query)
      return (await result).rowCount?? 0
    } catch (error) {
      throw new Error(`Erro ao excluir registros: ${error.message}`);
    }
  }
}

export default CategoriaRepository;
