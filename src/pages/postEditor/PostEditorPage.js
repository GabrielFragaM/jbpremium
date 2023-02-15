import React, {useState, useEffect} from 'react';
import TextArea from "antd/es/input/TextArea";
import PageHeader from "../../components/PageHeader";
import {
    deletePost,
    getCachePost,
    savePost,
} from "../../services/postStruct.service";
import Tabs from "../../components/Tabs";
import Icon from "../../components/icon";
import ButtonDelete from "../../components/ButtonDelete";
import ButtonAllowEdit from "../../components/ButtonAllowEdit";
import Form from "../../components/Form";
import {Select} from "antd";
import FormItem from "../../components/Form/formItem";
import {callApi} from "../../api/callApi";

export default function PostEditorPage() {

    const [allowEdit, setAllowEdit] = useState(!(getCachePost().hasOwnProperty('id')));
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]);

    function changeStatesDefault(){
        setLoading(false);
        setAllowEdit(false);
    }

    async function save(values){
        if(allowEdit === true){
            setLoading(true);
            await savePost(values);
            changeStatesDefault();
        }else{
            setAllowEdit(!allowEdit);
        }
    }

    useEffect(() => {
        callApi(`${process.env.REACT_APP_API_ENV}/Files`, 'GET', {}).then(async result => {
            let allDataResult = [];
            result.result.forEach(function(obj,i){
                allDataResult.push(
                    {
                        key: i,
                        value: obj.url,
                        label: obj?.name,
                        ...obj
                    }
                );
            });

            setFiles([
                {
                    key: 'noImage',
                    value: null,
                    label: 'Sem Imagem',
                    url: null,
                    name: 'Sem Imagem'
                },
                ...allDataResult
            ]);
        });
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
                key={'productEditor'}
                initialValues={getCachePost()}
                onFinish={(values) => save(values)}
            >
                <PageHeader
                    title={!(getCachePost().hasOwnProperty('id')) ? 'Novo Produto' : 'Produto'}
                    subTitle={!(getCachePost().hasOwnProperty('id')) ? null : getCachePost().title}
                    extra={<ButtonAllowEdit
                        loading={loading}
                        allowEdit={allowEdit}
                        data={getCachePost()}
                        onCancel={() => setAllowEdit(false)}
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
                                                        child: <TextArea disabled={!allowEdit} key={'name'}/>
                                                    },
                                                    {
                                                        name: 'description',
                                                        label: 'Descrição',
                                                        show: true,
                                                        rules: false,
                                                        child: <TextArea disabled={!allowEdit} />
                                                    },
                                                    {
                                                        name: 'categoryId',
                                                        label: 'Categoria',
                                                        show: true,
                                                        rules: false,
                                                        child: <Select
                                                            onChange={(category) => {
                                                                setCategories(category);
                                                        }} disabled={!allowEdit} options={categories.map(category =>
                                                            ({label: category?.name, value: category?.id}))}
                                                        />
                                                    },
                                                    {
                                                        name: (files.length !== 0 ? "imageUrl" : ''),
                                                        label: 'Imagem do Produto',
                                                        show: true,
                                                        rules: false,
                                                        child: <Select disabled={!allowEdit} options={files.map(image =>
                                                            ({label: image?.name.toString().split('_')[0], value: image?.url}))}
                                                        />
                                                    },
                                                ]
                                            }
                                        />,
                                    },
                                    {
                                        key: '2',
                                        icon: <Icon icon={'WarningOutlined'} />,
                                        title: 'Área de Risco',
                                        show: getCachePost().hasOwnProperty('id'),
                                        child: <ButtonDelete
                                            title={'Deletar permanente este Produto.'}
                                            endpoint={'Products'}
                                            allowEdit={allowEdit}
                                            onDelete={() => deletePost()}
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