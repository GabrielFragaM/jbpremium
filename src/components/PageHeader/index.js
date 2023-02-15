import React from 'react';
import { PageHeader as AntPageHeader} from "antd";

export default function PageHeader(props){

    const customProps = {
        children: props.children ?? <></>,
        title: props.title ?? '',
        extra: props.extra ?? <></>,
    };

    return(
        <>
            <AntPageHeader
                style={{ border: '1px solid rgb(235, 237, 240)'}}
                ghost={false}
                onBack={() => window.history.back()}
                title={customProps.title.toString()}
                extra={[
                    customProps.extra
                ]}
            >
                {customProps.children}
            </AntPageHeader>
        </>
    )
}






