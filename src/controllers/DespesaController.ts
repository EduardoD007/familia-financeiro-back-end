import { Request , Response} from "express";
import TypeDespesaQueryString from "../types/TypeDespesaQueryString";
import Despesa from "../models/Despesa";
import TypeAtualizaDespesas from "../types/TypeAtualizaDespesas";
import DespesaRepository from "../repositories/DespesaRepository";


class DespesaController {
  constructor(private repository: DespesaRepository) {
    this.repository = repository
  }

  async getAll(req: Request, res: Response) {
    const {tipo, descricao, categoria_id, data_despesa} = req.query as TypeDespesaQueryString

    const newQueryString: TypeDespesaQueryString = {tipo, descricao, categoria_id, data_despesa};

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
    try {
      const response = await this.repository.getByCategoria();
      return res.status(200).json(response);
  
      } catch (error) {
      return res.status(500).json(`${error.message} - Falha ao buscar registros`)
      }
  }
  
  async getDataSum(req: Request, res: Response) {
    try {
      const response = await this.repository.getSomaDespesas();
      return res.status(200).json(response);
    } catch (error) {
    return res.status(500).json({error: `Falha ao buscar soma das despesas: ${error.message}`})
    }
  }

  async saveData(req: Request, res: Response){
      const {despesa_id, tipo, descricao, categoria_id, valor, data_despesa, createdAt, updatedAt} = req.body as Despesa;
      const newDespesa = new Despesa({despesa_id, tipo, descricao, categoria_id, valor, data_despesa, updatedAt});
  
      try {
        const response = await this.repository.create(newDespesa);
        
        if(response === 1) {
          return res.status(200).json({message: 'Registro foi criado com sucesso'});
  
        }else {
          return res.status(500).json({message: 'Registro não foi criado'});
        }
        
      } catch (error) {
        return res.status(500).json(`${error.message} - Falha ao criar registro`)
      }
  }

  async updateData(req: Request, res: Response) {
    const { id } = req.params;
    const { tipo, descricao, categoria_id, data_despesa, valor, updatedAt} = req.body as TypeAtualizaDespesas;

    const newAtualizaDespesa: TypeAtualizaDespesas = { tipo, descricao, categoria_id, data_despesa, valor, updatedAt }
    const numericId: number = Number(id)

    try {
      const response = await this.repository.update(numericId, newAtualizaDespesa);
      
      if(response === 0) {
        return res.status(500).json(`A despesa ${id} nao foi atualizada com sucesso`)
      }else {
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
  
        if(response === 0) {
          return res.status(200).json(`Despesa ${id} não foi excluída`);
        }else {
          return res.status(500).json(`Despesa ${id} foi excluída com sucesso`);
        }
      } catch (error) {
        return res.status(500).json(`Erro ao excluir registro - ${error.message}`);
      }
    }
}

export default DespesaController;