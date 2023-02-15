import React, { useState, useEffect } from 'react';
import { callApi } from '../../api/callApi';
import {useNavigate} from "react-router-dom";
import SearchFilter from "../../components/SearchFilter";
import DataTable from "../../components/DataTable";
import {ProductTableSchema} from "./table/ProductTableSchema";
import Button from "../../components/Button";
import Icon from "../../components/icon";
import {updateCachePost} from "../../services/postStruct.service";

export default function AllProducts() {

    const [data, setData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [filteredData, setFilteredData] = useState(null);
    const options = [
        {
            key: 'title',
            label: 'Título',
            value: 'title'
        },
        {
            key: 'categoryName',
            label: 'Categoria',
            value: 'categoryName'
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

    async function getAllData(){
        let allDataResult = [];

        await callApi(`${process.env.REACT_APP_API_ENV}/Products`, 'GET', {}).then(async products => {

            for (let product of products.result){
                allDataResult.push({
                    ...product,
                    price: product.price.toString(),
                    categoryName: categories.find(p => p.id === product.categoryId).name
                });
            }
            setData(allDataResult);
        });
    }

    function addNewPost(){
        updateCachePost({update: {
                title: "Título do Post.",
                contents: [],
            }});
        navigate('newpost');
    }

    function editPost(record){
        updateCachePost({update: record});
        navigate('newpost');
    }

    function actionsTable(record){
        return <>
            <Button
                onClick={() => editPost(record)}
                icon={<Icon icon={'EditOutlined'}/>}
            />
        </>;
    }

    useEffect(() => {
        callApi(`${process.env.REACT_APP_API_ENV}/Categories`, 'GET', {}).then(async result => {
            let allDataResult = [];
            result.result.forEach(function(obj,i){
                allDataResult.push(
                    {
                        ...obj,
                        key: i,
                        label: obj.name,
                        value: obj.id
                    }
                );
            });
            setCategories(allDataResult);
            await getAllData();
        });
    }, []);

    return (
        <>
            <SearchFilter
                searchFilters={options}
                searchData={data}
                setFilteredData={setFilteredData}
                extraFilters={<></>}
                extra={ <Button
                    icon={<Icon icon={'FormOutlined'}/>}
                    type={'primary'}
                    title={'Novo Produto'}
                    onClick={() => addNewPost()}
                />}
            />
            <DataTable
                dataSource = {data === null ? [] : filteredData !== null ? filteredData : data}
                loading={data === null}
                columns={ProductTableSchema}
                actions={actionsTable}
            />
        </>
    );

}