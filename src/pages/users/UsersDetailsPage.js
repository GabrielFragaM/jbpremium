import React, {useState} from 'react';
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


export default function UsersDetailsPage() {

    const { Option } = Select;

    ///USE STATE
    const tempData = getDataLocalService(0);
    const [allowEdit, setAllowEdit] = useState(tempData === 'NaN');
    const [detectChanges, setDetectChanges] = useState(false);
    const [loading, setLoading] = useState(false);


    function changeStatesDefault(){
        setLoading(false);
        setAllowEdit(false);
        setDetectChanges(false);
    }

    async function save(values){
        if(allowEdit === true && detectChanges === true){
            setLoading(true);
            if(tempData !== 'NaN'){
                await callApi(`${process.env.REACT_APP_API_ENV}/Users/${tempData.id}`, 'PUT', {
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
                await callApi(`${process.env.REACT_APP_API_ENV}/Users/`, 'POST', {
                    ...values,
                    active: true
                }).then(result =>
                    {
                        message.success('Usuário criado com sucesso !', 1)
                            .then(succes => window.history.back());
                    }
                );
            }
            changeStatesDefault();
        }else{
            setAllowEdit(!allowEdit);
        }
    }

    function deleteUser(){

        callApi(`${process.env.REACT_APP_API_ENV}/Users/${tempData.id}`, 'DELETE', {}).then(result =>
            {
                message.success('Deletado com sucesso !', 1)
                    .then(succes => window.history.back());
            }
        );
    }

    return (
        <>
            <Form
                key={'userus'}
                initialValues={tempData}
                onValuesChange={() => {setDetectChanges(true);}}
                onFinish={(values) => save(values)}
            >
                <PageHeader
                    title={tempData === 'NaN' ? 'Novo Usuário' : 'Usuário'}
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
                                                        name: 'email',
                                                        label: 'Email',
                                                        show: true,
                                                        rules: true,
                                                        child: <Input disabled={tempData !== 'NaN'} />
                                                    },
                                                    {
                                                        name: 'role',
                                                        label: 'Permissões',
                                                        show: true,
                                                        rules: true,
                                                        child: <Select
                                                            disabled={!allowEdit}
                                                        >
                                                            <Option value={'Admin'}>{'Administrador'}</Option>
                                                        </Select>
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
                                            title={'Deletar permanente este Usuário.'}
                                            endpoint={'Users'}
                                            allowEdit={allowEdit}
                                            onDelete={() => deleteUser()}
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