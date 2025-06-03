import Categoria from "../../models/Categoria";
import TypeAtualizaCategoria from "../../types/TypeAtualizaCategoria";
import TypeCategoriaQueryString from "../../types/TypeCategoriaQueryString";

interface InterfaceCategoriaReposityory {
  getAll(where: TypeCategoriaQueryString): Promise<Categoria[]>;
  getById(id: number): Promise<Categoria[]>;
  create(categoria: Categoria): Promise<number>;
  update(id: number, data: TypeAtualizaCategoria): Promise<number>;
  delete(id:number): Promise<number>;
}

export default InterfaceCategoriaReposityory;