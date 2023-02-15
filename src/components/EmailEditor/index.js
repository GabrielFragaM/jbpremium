import React, {useRef, useState} from 'react';
import PageHeader from "../PageHeader";
import Button from "../Button";
import {save, updateContent} from "../../pages/postEditor/services/services";
import EmailEditor from 'react-email-editor';

export default function EmailEditorPost(props){

    const [loading, showLoading] = useState(false);
    const element = JSON.parse(sessionStorage.getItem('tempElement'));
    const [contentState, setContentState] = useState(element === null ?
        {
            content: '',
            type: 'emailEditor',
            paddingTop: 0,
            htmlContent: null,
            position: 'start',
            width: '100%'
        } : element);

    const emailEditorRef = useRef(null);

    const onLoad = () => {
        const template = contentState.htmlContent;
        if(contentState.htmlContent !== null){
            if(emailEditorRef.current === null){
                window.location.reload();
            }
            if(emailEditorRef.current !== null){
                emailEditorRef.current.editor.loadDesign(template);
            }
        }
    }

    const onReady = () => {
        console.log('onReady');
    };

    return(
        <>
            <PageHeader
                title={'Novo Conteúdo'}
                extra={<Button
                    title={'Salvar'}
                    loading={loading}
                    onClick={() => {
                        showLoading(true);
                        emailEditorRef.current.editor.exportHtml(async (data) => {
                            const {design, html} = data;
                            await updateContent('htmlContent', design, contentState, setContentState);
                            await updateContent('content', html, contentState, setContentState);
                            save(contentState, props.containerId, element, props.mode).then(() => showLoading(false));
                        });
                    }}
                />}
            />
            <EmailEditor
                ref={emailEditorRef}
                onLoad={onLoad}
                onReady={onReady}
            />
        </>
    )
}


