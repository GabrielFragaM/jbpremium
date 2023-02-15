import React, {useState} from 'react';
import {Image, Input, message, Space} from "antd";
import PageHeader from "../../components/PageHeader";
import Tabs from "../../components/Tabs";
import Form from "../../components/Form";
import Icon from "../../components/icon";
import {callApi} from "../../api/callApi";
import ButtonAllowEdit from "../../components/ButtonAllowEdit";
import FormItem from "../../components/Form/formItem";
import UploadButton from "../../components/UploadButton";


export default function FilesDetailsPage() {

    ///USE STATE
    const [allowEdit, setAllowEdit] = useState('NaN');
    const [loading, setLoading] = useState(false);
    const [imageBase64, setImageBase64] = useState('');

    async function save(values){
        values = {...values, imageBase64: imageBase64.split(',')[1]}
        console.log(values)
        setLoading(true);
        await callApi(`${process.env.REACT_APP_API_ENV}/Files`, 'POST', {
            ...values,
            extension: "png"
        }).then(async (image) => {
            await callApi(`${process.env.REACT_APP_API_ENV}/Files/`, 'POST', {
                ...values,
                extension: "png",
                url: image.result
            }).then(async result => {
                    await deleteImage(image.result.id, false);
                    message.success('Nova imagem carregado com sucesso !', 1)
                        .then(succes => window.history.back());
                }
            );
        });
    }

    function deleteImage(fileId, showMessage){
        callApi(`${process.env.REACT_APP_API_ENV}/Files/${fileId}`, 'DELETE', {}).then(result =>
            {
                if(showMessage){
                    message.success('Deletado com sucesso !', 1)
                        .then(succes => window.history.back());
                }
            }
        );
    }

    return (
        <>
            <Form
                key={'files'}
                initialValues={{}}
                onFinish={(values) => save(values)}
            >
                <PageHeader
                    title={'Novo Imagem'}
                    subTitle={null}
                    extra={<ButtonAllowEdit
                        loading={loading}
                        allowEdit={allowEdit}
                        data={'NaN'}
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
                                        child: <>
                                            <FormItem
                                                children={
                                                    [
                                                        {
                                                            name: 'name',
                                                            label: 'Nome',
                                                            show: true,
                                                            rules: true,
                                                            child: <Input disabled={!allowEdit} />
                                                        },
                                                    ]
                                                }
                                            />
                                            <Space direction={'vertical'}>
                                                <Image
                                                    height={'55px'}
                                                    src={imageBase64}
                                                />
                                                <UploadButton
                                                    getValues={(value) => setImageBase64(value)}
                                                />
                                            </Space>
                                        </>
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