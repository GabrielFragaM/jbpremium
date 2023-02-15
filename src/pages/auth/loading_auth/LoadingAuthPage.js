import React from 'react';
import {Row, Typography, Spin} from 'antd';
import './LoadingAuthCss.css';


export default function LoadingAuthPage() {

    
    const { Title } = Typography;

    return (
        <div className='bodyLoadingLoginPage'>
            <div className="loading-page">
                <div className="FormLoadingLogin">
                    <Row justify={'space-between'} >
                        <Spin size={'large'}/>
                        <Title level={2}>{'Acessando...'}</Title>
                    </Row>
                </div>
            </div>
        </div>
    );
}
