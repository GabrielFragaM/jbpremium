import React from 'react';
import {Avatar, Card as AntCard, Row} from "antd";

export default function Card(props){

    const defaultProps = {
        title: props.title ?? "Título do Card",
        description: props.description ?? "Descrição do Card",
        size: props.size ?? 100,
        paddingTop: props.paddingTop ?? 0,
        position: props.position ?? 'start',
        img: props.img ?? "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        avatar: props.avatar ?? "https://joeschmoe.io/api/v1/random"
    };

    const { Meta } = AntCard;

    function getCardTemplate(){
        return (
            <Row style={{paddingTop: (defaultProps.paddingTop).toString() + 'px',}} justify={defaultProps.position}>
                <AntCard
                    style={{
                        width: (defaultProps.size).toString() + '%',
                    }}
                    cover={
                        <img
                            alt={defaultProps.img}
                            src={defaultProps.img}
                        />
                    }
                >
                    <Meta
                        avatar={<Avatar src={defaultProps.avatar}/>}
                        title={<div dangerouslySetInnerHTML={{__html: defaultProps.title}} />}
                        description={<div dangerouslySetInnerHTML={{__html: defaultProps.description}} />}
                    />
                </AntCard>
            </Row>
        )
    }

    return getCardTemplate();
}


