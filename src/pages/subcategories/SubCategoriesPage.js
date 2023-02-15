import React, { useState, useEffect } from 'react';
import { callApi } from '../../api/callApi';
import DataTable from '../../components/DataTable';
import SearchFilter from "../../components/SearchFilter";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import Icon from "../../components/icon";
import {SubCategoriesTableSchema} from "./table/SubCategoriesTableSchema";
import {saveDataLocalService} from "../../services/storage.service";


export default function SubCategoriesPage() {

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
            key: 'updatedAtString',
            label: 'Última Atualização',
            value: 'updatedAtString'
        },
        {
            key: 'createdAtString',
            label: 'Data de Criação',
            value: 'createdAtString'
        },
    ];

    const navigate = useNavigate();

    function addNewSubCategory(){
        saveDataLocalService(0, 'NaN', true);
        navigate('subcategory');
    }

    function editSubCategory(record){
        saveDataLocalService(0, record, true);
        navigate('subcategory');
    }

    async function getAllData(){

        callApi(`${process.env.REACT_APP_API_ENV}/SubCategories`, 'GET', {}).then(async result => {
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
                onClick={() => editSubCategory(record)}
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
                    title={'Nova Sub Categoria'}
                    onClick={() => addNewSubCategory()}
                />}
            />
            <DataTable
                dataSource = {data === null ? [] : filteredData !== null ? filteredData : data}
                loading={data === null}
                columns={SubCategoriesTableSchema}
                actions={actionsTable}
            />
        </>
    );
}