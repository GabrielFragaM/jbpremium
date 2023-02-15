import React, {useState} from 'react';
import {Form, Input, Button, Typography} from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './LoginPageCss.css';
import {saveDataLocalService} from '../../services/storage.service';
import {callApi} from "../../api/callApi";

export default function LoginPage() {

    const { Title, Text } = Typography;
    const [loading, setLoading] = useState(false);

    async function authLogin(values){
        setLoading(true);
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            sessionStorage.setItem('auth', JSON.stringify(true));
            console.log(userCredential.user.uid)
            userCredential.user.getIdToken().then((token) => {
                callApi(`${process.env.REACT_APP_API_ENV}Users/${userCredential.user.uid}`, 'GET', {}, token).then(async user => {
                    console.log(user)
                    saveDataLocalService(1, {
                        userDetails: user.result,
                        userId: userCredential.user.uid,
                        token: token,
                        refreshToken: userCredential.user.refreshToken,
                    }, true);
                    window.location.reload();
                });
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className='bodyLoginPage'>
            <div className="login-page">
                <div className="FormLogin">
                    <Form onFinish={(values) => authLogin(values)} className="login-form">
                        <Title level={2}>{'Entrar'}</Title>
                        <Text className='textInfo' type="secondary">{'Painel do Administrador JB Premium'}</Text>
                        <br></br>
                        <Text className='textInfo2' >.</Text>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Obrigatório',
                                },
                            ]}
                        >
                            <Input disabled={loading} type="text" className='InputForm'  placeholder={'Email'}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Obrigatório',
                                },
                            ]}
                        >
                            <Input.Password disabled={loading} type="password" className='InputForm'  placeholder={'Senha'}/>
                        </Form.Item>
                        <Button loading={loading} type='primary' htmlType="submit" >{'Acessar'}</Button>'
                    </Form>
                </div>
            </div>
        </div>
    );
}
