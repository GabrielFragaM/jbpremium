import React, { useState, useEffect } from 'react';
import { callApi } from '../../api/callApi';
import DataTable from '../../components/DataTable';
import SearchFilter from "../../components/SearchFilter";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import Icon from "../../components/icon";
import {CategoriesTableSchema} from "./table/CategoriesTableSchema";
import {saveDataLocalService} from "../../services/storage.service";
import {formatDataString} from "../../services/date.service";


export default function CategoriesPage() {

    ///USE STATE
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const options = [
        {
            key: 'name',
            label: 'Nome',
            value: 'name'
        },
        {
            key: 'description',
            label: 'Descrição',
            value: 'description'
        },
        {
            label: 'Última Atualização',
            value: 'updatedAtString',
            key: 'updatedAtString',
        },
        {
            label: 'Data de Criação',
            value: 'createdAtString',
            key: 'createdAtString'
        },
    ];

    const navigate = useNavigate();

    function addNewCategory(){
        saveDataLocalService(0, 'NaN', true);
        navigate('category');
    }

    function editCategory(record){
        saveDataLocalService(0, record, true);
        navigate('category');
    }

    async function getAllData(){

        callApi(`${process.env.REACT_APP_API_ENV}/Categories`, 'GET', {}).then(async result => {
            let allDataResult = [];
            result.result.forEach(function(obj,i){
                allDataResult.push(
                    {
                        key: i,
                        ...obj
                    }
                );
            });
            setData(allDataResult);
        });

    }

    function actionsTable(record){
        return <>
            <Button
                onClick={() => editCategory(record)}
                icon={<Icon icon={'EditOutlined'}/>}
            />
        </>;
    }

    useEffect(() => {
        getAllData();
    }, []);

    return (
        <>
            <SearchFilter
                searchFilters={options}
                searchData={data}
                setFilteredData={setFilteredData}
                extra={<Button
                    icon={<Icon icon={'FormOutlined'}/>}
                    type={'primary'}
                    title={'Nova Categoria'}
                    onClick={() => addNewCategory()}
                />}
            />
            <DataTable
                dataSource = {data === null ? [] : filteredData !== null ? filteredData : data}
                loading={data === null}
                columns={CategoriesTableSchema}
                actions={actionsTable}
            />
        </>
    );
}