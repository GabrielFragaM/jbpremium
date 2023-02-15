import {formatDataString} from "../../../services/date.service";

export const ProductTableSchema =  [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Categoria',
    dataIndex: 'categoryName',
    key: 'categoryName',
    sorterName: 'categoryName'
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    key: 'price',
    sorterName: 'price'
  },
  {
    title: 'Última Atualização',
    dataIndex: 'updatedAtString',
    key: 'updatedAtString',
    sorter: (a, b) => new Date(a.createdAtString) - new Date(b.createdAtString),
    render: (date) => formatDataString(date)
  },
  {
    title: 'Data de Criação',
    dataIndex: 'createdAtString',
    key: 'createdAtString',
    sorter: (a, b) => new Date(a.createdAtString) - new Date(b.createdAtString),
    render: (date) => formatDataString(date)
  },
];