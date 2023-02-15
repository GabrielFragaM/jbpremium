import React, { useEffect, useState } from 'react';
import DataTable from "../../components/DataTable";
import {callApi} from "../../api/callApi";
import Button from "../../components/Button";
import {message, Row, Space} from "antd";
import Icon from "../../components/icon";
import SearchFilter from "../../components/SearchFilter";
import {saveDataLocalService} from "../../services/storage.service";
import {useNavigate} from "react-router-dom";
import {formatDataString} from "../../services/date.service";

export default function AllFilesPage() {

    const navigate = useNavigate();

    const [files, setFiles] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const options = [
        {
            key: 'name',
            label: 'Nome',
            value: 'name'
        },
    ];

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: (text) => text.toString().split('_')[0]
        },
        {
            title: 'Data de Criação',
            dataIndex: 'createdAtString',
            key: 'createdAtString',
            width: '15%',
            sorter: (a, b) => new Date(a.createdAtString) - new Date(b.createdAtString),
            render: (date) => formatDataString(date)
        },
        {
            title: 'Status',
            dataIndex: 'isDone',
            key: 'isDone',
            render: () => 'Pronto'
        },
    ];

    function deleteImage(fileId){
        callApi(`${process.env.REACT_APP_API_ENV}/Files/${fileId}`, 'DELETE', {}).then(result =>
            {
                message.success('Deletado com sucesso !', 1);
                getAllData();
            }
        );
    }

    function actions(record){
        return (
            <Row justify={'end'}>
                <Space>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(record.url);
                            message.success('Link da imagem copiado.')
                        }}
                        icon={<Icon icon={'CopyOutlined'} />}
                    />
                    <Button
                        type={'danger'}
                        onClick={() => deleteImage(record.id)}
                        icon={<Icon icon={'DeleteOutlined'} />}
                    />
                </Space>
            </Row>
        )
    }

    async function getAllData(){
        callApi(`${process.env.REACT_APP_API_ENV}/Files`, 'GET', {}).then(async result => {
            let allDataResult = [];
            result.result.forEach(function(obj,i){
                allDataResult.push(
                    {
                        key: i,
                        ...obj
                    }
                );
            });

            setFiles(allDataResult);
        });
    }

    function addNewImage(){
        saveDataLocalService(0, 'NaN', true);
        navigate('file');
    }

    useEffect(() => {
        getAllData();
    }, []);

    return (
        <>
            <SearchFilter
                searchFilters={options}
                searchData={files}
                setFilteredData={setFilteredData}
                extra={<Button
                    icon={<Icon icon={'FormOutlined'}/>}
                    type={'primary'}
                    title={'Nova Imagem'}
                    onClick={() => addNewImage()}
                />}
            />
            <DataTable
                columns={columns}
                actions={actions}
                dataSource={files === null ? [] : filteredData !== null ? filteredData : files}
                loading={files === null}
            />
        </>
    );

}