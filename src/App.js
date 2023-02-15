import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import PageLayout from './pages/PageLayout';
import LoginPage from './pages/auth/LoginPage';
import UsersPage from './pages/users/UsersPage';
import UsersDetailsPage from './pages/users/UsersDetailsPage';
import { initializeApp } from 'firebase/app';
import {getDataLocalService} from './services/storage.service';
import LoadingAuthPage from './pages/auth/loading_auth/LoadingAuthPage';

export default function App() {

    const firebaseConfig = {
        apiKey: 'AIzaSyBBrL5wC7VJjIKYtZHKIyMLCx1bdpZgwh4',
        authDomain: 'o-bicho-b9eb5.firebaseapp.com',
        projectId: 'o-bicho-b9eb5',
        storageBucket: 'o-bicho-b9eb5.appspot.com',
        messagingSenderId: '222742091404',
        appId: '1:222742091404:web:3af29d7e840074fbaa8da9'
    };

    initializeApp(firebaseConfig);

    const [authConfirm, setAuthConfirm] = useState(null);

    async function checkAuth(){

        let _authDetails = getDataLocalService(1);

        if(_authDetails !== null){
            setAuthConfirm(true);
        }else{
            setAuthConfirm(false);
        }
    }

    useEffect(() => {
        checkAuth().then();
    }, []);

    return (
        <React.Fragment>
            {
                authConfirm === null ?
                    <LoadingAuthPage/> :
                    authConfirm === true ?
                        <Routes>
                            <Route path="/" element={<PageLayout/>}>
                                <Route path="/allusers" element={<UsersPage />}/>
                                <Route path="/allusers/user" element={<UsersDetailsPage />}/>
                            </Route>
                        </Routes> :
                        <LoginPage/>
            }
        </React.Fragment>
    );
}