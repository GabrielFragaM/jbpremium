import React from 'react';
import { Form as AntForm } from "antd";

export default function Form(props){

    const customProps = {
        key: props.key ?? 'form',
        children: props.children ?? <></>,
        onValuesChange: props.onValuesChange ?? null,
        onFinish: props.onFinish ?? null,
        initialValues: props.initialValues ?? {},
    };

    return(
        <>
            <AntForm
                key={customProps.key}
                initialValues={
                    customProps.initialValues
                }
                onValuesChange={customProps.onValuesChange}
                onFinish={(values) => customProps.onFinish(values)}
                layout="vertical" wrapperCol={{ span: 24 }}
            >
                {
                    customProps.children
                }
            </AntForm>
        </>
    )
}



