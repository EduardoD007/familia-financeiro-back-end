
import Despesa from "../../models/Despesa";
import TypeAtualizaDespesas from "../../types/TypeAtualizaDespesas";
import TypeDespesaQueryString from "../../types/TypeDespesaQueryString";

interface InterfaceDespesaRepository {
  getAll(where: TypeDespesaQueryString): Promise<Despesa[]>;
  getByCategoria(): Promise<Despesa[]>;
  getSomaDespesas(): Promise<Despesa[]>;
  getById(id: number): Promise<Despesa[]>;
  create(despesa: Despesa): Promise<number>;
  update(id: number, data: TypeAtualizaDespesas): Promise<number>;
  delete(id: number): Promise<number>;
}

export default InterfaceDespesaRepository;