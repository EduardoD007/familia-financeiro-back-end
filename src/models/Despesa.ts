
class Despesa {
  despesa_id!: number;
  tipo: string;
  descricao: string;
  categoria_id: number;
  valor: number;
  data_despesa: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    despesa_id,
    tipo,
    descricao,
    categoria_id,
    valor,
    data_despesa,
    updatedAt,
  }: {
    despesa_id: number;
    tipo: string;
    descricao: string;
    categoria_id: number;
    valor: number;
    data_despesa: Date;
    updatedAt: Date;
  }
  ) {
    this.despesa_id = despesa_id;
    this.tipo = tipo;
    this.descricao = descricao;
    this.categoria_id = categoria_id;
    this.valor = valor;
    this.data_despesa = data_despesa
    this.createdAt = new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

export default Despesa;