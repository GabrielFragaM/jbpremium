import React, {useEffect, useState} from 'react';
import {Input, message, Select} from "antd";
import PageHeader from "../../components/PageHeader";
import Tabs from "../../components/Tabs";
import Form from "../../components/Form";
import {getDataLocalService} from "../../services/storage.service";
import ButtonDelete from "../../components/ButtonDelete";
import Icon from "../../components/icon";
import {callApi} from "../../api/callApi";
import ButtonAllowEdit from "../../components/ButtonAllowEdit";
import FormItem from "../../components/Form/formItem";


export default function SubCategoriesDetailsPage() {

    ///USE STATE
    const tempData = getDataLocalService(0);
    const [allowEdit, setAllowEdit] = useState(tempData === 'NaN');
    const [detectChanges, setDetectChanges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    function changeStatesDefault(){
        setLoading(false);
        setAllowEdit(false);
        setDetectChanges(false);
    }

    async function save(values){
        if(allowEdit === true && detectChanges === true){
            setLoading(true);
            if(tempData !== 'NaN'){
                await callApi(`${process.env.REACT_APP_API_ENV}/SubCategories/${tempData.id}`, 'PUT', {
                    ...values,
                    id: tempData.id
                }).then(result =>
                    {
                        message.success('Salvo com sucesso !', 1);
                        setLoading(false);
                        setAllowEdit(false);
                    }
                );
            }else{
                await callApi(`${process.env.REACT_APP_API_ENV}/SubCategories/`, 'POST', {
                    ...values,
                }).then(result =>
                    {
                        message.success('Sub Categoria criada com sucesso !', 1)
                            .then(succes => window.history.back());
                    }
                );
            }
            changeStatesDefault();
        }else{
            setAllowEdit(!allowEdit);
        }
    }

    function deleteCategory(){

        callApi(`${process.env.REACT_APP_API_ENV}/SubCategories/${tempData.id}`, 'DELETE', {}).then(result =>
            {
                message.success('Deletado com sucesso !', 1)
                    .then(succes => window.history.back());
            }
        );
    }

    useEffect(() => {
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
            setCategories(allDataResult);
        });
    }, []);

    return (
        <>
            <Form
                key={'subcategory'}
                initialValues={tempData}
                onValuesChange={() => {setDetectChanges(true);}}
                onFinish={(values) => save(values)}
            >
                <PageHeader
                    title={tempData === 'NaN' ? 'Nova Sub Categoria' : 'Sub Categoria'}
                    subTitle={tempData === 'NaN' ? null : tempData.name}
                    extra={<ButtonAllowEdit
                        loading={loading}
                        allowEdit={allowEdit}
                        data={tempData}
                        onCancel={() => setAllowEdit(false)}
                        onSave={() => save()}
                    />}
                    children={
                        <Tabs
                            defaultActiveKey={'1'}
                            children={
                                [
                                    {
                                        key: '1',
                                        icon: <Icon icon={'FormOutlined'} />,
                                        title: 'Detalhes',
                                        show: true,
                                        child: <FormItem
                                            children={
                                                [
                                                    {
                                                        name: 'name',
                                                        label: 'Nome',
                                                        show: true,
                                                        rules: true,
                                                        child: <Input disabled={!allowEdit} />
                                                    },
                                                    {
                                                        name: 'description',
                                                        label: 'Descrição',
                                                        show: true,
                                                        rules: false,
                                                        child: <Input disabled={!allowEdit} />
                                                    },
                                                    {
                                                        name: (categories.length !== 0 ? "categoryId" : ''),
                                                        label: 'Categoria',
                                                        show: true,
                                                        rules: true,
                                                        child: <Select disabled={!allowEdit} options={categories.map(category =>
                                                            ({label: category.name, value: category.id}))}
                                                        />
                                                    },
                                                    {
                                                        name: 'imageUrl',
                                                        label: 'Banner Link',
                                                        show: true,
                                                        rules: false,
                                                        md: 24,
                                                        child: <Input disabled={!allowEdit} />
                                                    },
                                                ]
                                            }
                                        />
                                    },
                                    {
                                        key: '2',
                                        icon: <Icon icon={'WarningOutlined'} />,
                                        title: 'Área de Risco',
                                        show: tempData !== 'NaN',
                                        child:  <ButtonDelete
                                            title={'Deletar permanente esta Sub Categoria.'}
                                            endpoint={'SubCategories'}
                                            allowEdit={allowEdit}
                                            onDelete={() => deleteCategory()}
                                        />
                                    },
                                ]
                            }
                        />
                    }
                />
            </Form>
        </>
    );
}