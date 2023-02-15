import React from 'react';
import { Button as AntButton } from "antd";

export default function Button(props){

    const defaultProps = {
        onClick: props.onClick ?? null,
        disabled: props.disabled ?? false,
        size: props.size ?? 'midlle',
        loading: props.loading ?? false,
        icon: props.icon ?? <></>,
        title: props.title ?? '',
        type: props.type ?? 'default'
    };

    return(
        <>
            <AntButton
                size={defaultProps.size}
                disabled={defaultProps.disabled}
                onClick={defaultProps.onClick}
                icon={defaultProps.icon}
                loading={defaultProps.loading}
                type={defaultProps.type}
            >
                {defaultProps.title}
            </AntButton>
        </>
    )
}


