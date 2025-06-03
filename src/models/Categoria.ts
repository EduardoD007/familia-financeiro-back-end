
class Categoria {
  categoria_id: number;
  descricao: string;
  tipo: string;
  createdAt: Date;
  updatedAt: Date;
  constructor({
    categoria_id,
    descricao,
    tipo,
    updatedAt
  }: {
    categoria_id: number;
    descricao: string;
    tipo: string;
    updatedAt: Date;
  }) {
    this.categoria_id = categoria_id;
    this.descricao = descricao;
    this.tipo = tipo;
    this.createdAt = new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

export default Categoria;
