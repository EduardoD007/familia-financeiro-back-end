import { Request, Response } from 'express'
import TypeCategoriaQueryString from '../types/TypeCategoriaQueryString.js'
import Categoria from '../models/Categoria.js'
import TypeAtualizaCategoria from '../types/TypeAtualizaCategoria.js'
import CategoriaRepository from '../repositories/CategoriaRepository.js'



class CategoriaController {
  constructor(private repository: CategoriaRepository){
    this.repository = repository
  }

  async getAllData(req: Request, res: Response) {
    const {descricao, tipo} = req.query as TypeCategoriaQueryString;
    const newQueryString: TypeCategoriaQueryString = {descricao, tipo};

    try {
      const response = await this.repository.getAll(newQueryString);
      return res.status(200).json(response);

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

  async saveData(req: Request, res: Response){
    const {categoria_id, descricao, tipo, updatedAt} = req.body as Categoria;
    const newCategoria = new Categoria({categoria_id, descricao, tipo, updatedAt});

    try {
      const response = await this.repository.create(newCategoria);
      
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
    const { descricao, tipo } = req.body as TypeAtualizaCategoria;

    const newAtualizaCategoria: TypeAtualizaCategoria = { descricao, tipo }
    const numericId: number = Number(id)

    try {
      const response = await this.repository.update(numericId, newAtualizaCategoria);
      
      if(response === 0) {
        return res.status(500).json(`A categoria ${id} nao foi atualizada com sucesso`)
      }else {
        return res.status(500).json(`A categoria ${id} foi atualizada com sucesso`)
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
        return res.status(200).json(`Categoria ${id} não foi excluída`);
      }else {
        return res.status(500).json(`Categoria ${id} foi excluída com sucesso`);
      }
    } catch (error) {
      return res.status(500).json(`Erro ao excluir registro - ${error.message}`);
    }
  }
}

export default CategoriaController