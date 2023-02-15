import { userDetails } from "./userDetails";
import {callApi} from "./callApi";


export async function refreshToken() {

    return await callApi(`${process.env.REACT_APP_API_ENV}/Auth/RefreshToken`, 'POST', {
        userId: userDetails['user']['id'],
        refreshToken: userDetails['refreshToken']
    }).then(async result => {
        if(result.responseStatus === 200){
            sessionStorage.setItem('authDetails', JSON.stringify({
                userDetails: userDetails['user_details'],
                userId: result.result['userId'],
                token: result.result['token'],
                refreshToken: result.result['refreshToken'],
            }));
            return true;
        }else{
            return false;
        }
    });
}
