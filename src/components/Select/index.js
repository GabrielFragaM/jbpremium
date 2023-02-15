import React  from 'react';
import {Select as AntSelect} from "antd";

export default function Select(props){

    const { Option } = AntSelect;

    const defaultProps = {
        options: props.options ?? [
            <Option value="start">Esquerda</Option>,
            <Option value="center">Centralizado</Option>,
            <Option value="end">Direita</Option>
        ],
    };

    return(
        <>
            <AntSelect
                defaultValue={props.defaultValue}
                style={{width: '100%'}}
                onChange={props.onChange}
            >
                {defaultProps.options}
            </AntSelect>
        </>
    )
}


