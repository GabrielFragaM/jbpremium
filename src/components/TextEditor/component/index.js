import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const TextEditor = (props) => {
    const editor = useRef(null);

    const defaultTextEditorConfig = props.config ?? {
        readonly: false,
        height: 900,
        placeholder: 'Digite aqui...'
    };

    function getTextEditorTemplate(){
        return (
                <JoditEditor
                    key={props.key}
                    ref={editor}
                    value={props.content}
                    config={defaultTextEditorConfig}
                    tabIndex={1}
                    onBlur={props.setContent}
                />
        )
    }

    return (
        <>
            {getTextEditorTemplate()}
        </>
    );
};

export default TextEditor;