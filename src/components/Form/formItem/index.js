import React from 'react';
import {Col, Form, Row} from "antd";

export default function FormItem(props){

    const customProps = {
        children: props.children ?? [],
    };
    function getChildFormItem(children){

        return <Row gutter={16}>
            {
                children.map((item, i) => {
                    if(item.show === true){
                        return <Col xs={{ span: item.xs ?? 24 }} md={{ span: item.md ?? 12 }}>
                            <Form.Item
                                key={i}
                                name={item.name}
                                label={item.label}
                                rules={[
                                    {
                                        required: item.rules,
                                        message: item.rules === true ? 'Requerido' : '',
                                    },
                                ]}
                            >
                                {item.child}
                            </Form.Item>
                        </Col>
                    }else{
                        return <></>
                    }
                })
            }
        </Row>
    }

    return(
        <>
            {getChildFormItem(customProps.children)}
        </>
    )
}



