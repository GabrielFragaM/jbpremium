import React, { useState } from 'react';
import {InputNumber} from "antd";
import PageHeader from "../PageHeader";
import Tabs from "../Tabs";
import Button from "../Button";
import SelectPosition from "../Select";
import FormItem from "../Form/formItem";
import Form from "../Form";
import TextEditor from "./component";
import {save, updateContent} from "../../pages/postEditor/services/services";
import Icon from "../icon";
import ParseContentToHtml from "../ParseHtml";


export default function EditTextEditor(props){

    const element = JSON.parse(sessionStorage.getItem('tempElement'));
    const [loading, showLoading] = useState(false);
    const [contentState, setContentState] = useState(element === null ?
        {
            content: '',
            type: 'textEditor',
            paddingTop: 0,
            position: 'start',
            width: '100%'
        } : element);

    function getContentTemplate(){
        return ParseContentToHtml(contentState);
    }

    return(
        <>
            <Form
                children={
                    <PageHeader
                        title={'Novo Conteúdo'}
                        extra={<></>}
                        children={
                            <Tabs
                                defaultActiveKey={'1'}
                                tabBarExtraContent={
                                    <Button
                                        loading={loading}
                                        title={'Salvar'}
                                        onClick={() => {
                                            showLoading(true);
                                            save(contentState, props.containerId, element, props.mode).then(() => showLoading(false));
                                        }}
                                    />
                                }
                                children={
                                    [
                                        {
                                            key: '1',
                                            icon: <Icon icon={'InboxOutlined'}/>,
                                            title: 'Template',
                                            show: true,
                                            child: getContentTemplate()
                                        },
                                        {
                                            key: '2',
                                            icon: <Icon icon={'EditOutlined'}/>,
                                            title: 'Editor',
                                            show: true,
                                            child: <TextEditor
                                                {...contentState}
                                                setContent={(content) => updateContent('content', content, contentState, setContentState)}
                                            />
                                        },
                                        {
                                            key: '3',
                                            icon: <Icon icon={'ToolOutlined'}/>,
                                            title: 'Configurações',
                                            show: true,
                                            child: <FormItem
                                                children={
                                                    [
                                                        {
                                                            name: 'position',
                                                            label: 'Posicionamento',
                                                            show: true,
                                                            rules: false,
                                                            child: <SelectPosition
                                                                defaultValue={'start'}
                                                                onChange={(value) => updateContent("position", value, contentState, setContentState)}
                                                            />
                                                        },
                                                        {
                                                            name: 'paddingTop',
                                                            label: 'Padding Top',
                                                            show: true,
                                                            rules: false,
                                                            child: <InputNumber
                                                                addonAfter="px" defaultValue={0}
                                                                max={100}
                                                                min={0}
                                                                onChange={(value) => updateContent("paddingTop", value, contentState, setContentState)}
                                                            />
                                                        },
                                                    ]
                                                }
                                            />
                                        },
                                        {
                                            key: '4',
                                            icon: <Icon icon={'ExclamationCircleOutlined'}/>,
                                            title: 'Recomendações',
                                            show: true,
                                            child: <>
                                                <ul>
                                                    <li><span style={{color: 'rgb(0, 0, 0)', fontSize: '14px'}}>Para contêiners no formato de <strong>Fileira</strong>, use <strong style={{fontSize: '14px'}}>Shit Esquerdo + Enter</strong> no teclado, para quebrar uma ou várias linhas no editor, para facilitar a leitura do conteúdo gerado no final!</span></li>
                                                </ul>
                                            </>
                                        },
                                    ]
                                }
                            />
                        }
                    />
                }
            />
        </>
    )
}


