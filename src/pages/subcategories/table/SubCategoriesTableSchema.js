import {formatDataString} from "../../../services/date.service";


export const SubCategoriesTableSchema =  [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: 'description',
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