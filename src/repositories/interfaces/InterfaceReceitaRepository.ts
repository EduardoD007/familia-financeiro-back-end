import Receita from "../../models/Receita";
import TypeAtualizaReceitas from "../../types/TypeAtualizaReceitas";
import TypeReceitaQueryString from "../../types/TypeReceitaQueryString";

interface InterfaceReceitaReposityory {
  getAll(where: TypeReceitaQueryString): Promise<Receita[]>;
  getByCategoria(): Promise<Receita[]>;
  getSomaReceitas(): Promise<Receita[]>;
  getById(id: number): Promise<Receita[]>;
  create(despesa: Receita): Promise<number>;
  update(id: number, data: TypeAtualizaReceitas): Promise<number>;
  delete(id: number): Promise<number>;
}

export default InterfaceReceitaReposityory;