import { Request, Response } from "express";
import TypeReceitaQueryString from "../types/TypeReceitaQueryString";
import TypeAtualizaReceitas from "../types/TypeAtualizaReceitas";
import Receita from "../models/Receita";
import ReceitaRepository from "../repositories/ReceitaRepository";

class ReceitaController {
  constructor(private repository: ReceitaRepository) {
    this.repository = repository
  }

  async getAll(req: Request, res: Response) {
    const { tipo, descricao, categoria_id, data_receita } = req.query as TypeReceitaQueryString

    const newQueryString: TypeReceitaQueryString = { tipo, descricao, categoria_id, data_receita };

    try {
      const registros = await this.repository.getAll(newQueryString);
      return res.status(200).json(registros);

    } catch (error) {
      return res.status(500).json(`${error.message} - Falha ao buscar registros`)
    }
  }

  async getDataById(req: Request, res: Response) {
    const { id } = req.params;

    const numericId: number = Number(id);

    try {
      const response = await this.repository.getById(numericId);
      return res.status(200).json(response);

    } catch (error) {
      return res.status(500).json(`${error.message} - Falha ao buscar registros`)
    }
  }

  async getDataByCategoria(req: Request, res: Response) {
    console.log('entrou receitas')
    try {
      const response = await this.repository.getByCategoria();
      return res.status(200).json(response);

    } catch (error) {
      return res.status(500).json(`${error.message} - Falha ao buscar registros`)
    }
  }

  async getDataSum(req: Request, res: Response) {
    try {
      const response = await this.repository.getSomaReceitas();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: `Falha ao buscar soma das despesas: ${error.message}` })
    }
  }

  async saveData(req: Request, res: Response) {
    const { receita_id, tipo, descricao, categoria_id, valor, data_receita, createdAt, updatedAt } = req.body as Receita;
    const newDespesa = new Receita({ receita_id, tipo, descricao, categoria_id, valor, data_receita, updatedAt });

    try {
      const response = await this.repository.createReceita(newDespesa);

      if (response === 1) {
        return res.status(200).json({ message: 'Registro foi criado com sucesso' });

      } else {
        return res.status(500).json({ message: 'Registro não foi criado' });
      }

    } catch (error) {
      return res.status(500).json(`${error.message} - Falha ao criar registro`)
    }
  }

  async updateData(req: Request, res: Response) {
    const { id } = req.params;
    const { tipo, descricao, categoria_id, data_receita, valor, updatedAt } = req.body as TypeAtualizaReceitas;

    const newAtualizaDespesa: TypeAtualizaReceitas = { tipo, descricao, categoria_id, data_receita, valor, updatedAt }
    const numericId: number = Number(id)

    try {
      const response = await this.repository.update(numericId, newAtualizaDespesa);

      if (response === 0) {
        return res.status(500).json(`A despesa ${id} nao foi atualizada com sucesso`)
      } else {
        return res.status(500).json(`A despesa ${id} foi atualizada`)
      }
    } catch (error) {
      return res.status(500).json(`Erro ao atualizar registro - ${error.message}`);
    }
  }

  async deleteData(req: Request, res: Response) {
    const { id } = req.params

    const numericId: number = Number(id)

    try {
      const response = await this.repository.delete(numericId)

      if (response === 0) {
        return res.status(200).json(`Receita ${id} não foi excluída`);
      } else {
        return res.status(500).json(`Receita ${id} foi excluída com sucesso`);
      }
    } catch (error) {
      return res.status(500).json(`Erro ao excluir registro - ${error.message}`);
    }
  }
}

export default ReceitaController;