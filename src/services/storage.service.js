

export function getDataLocalService(keyNumber){

    function get(key){
        return JSON.parse(sessionStorage.getItem(key))
    }

    switch (keyNumber){
        case 0:
            return get('tempData');
        case 1:
            return get('authDetails');
        default:
            return get('tempData');
    }
}

export function saveDataLocalService(keyNumber, data, json){
    function set(key, data){
        sessionStorage.setItem(key, json === true ? JSON.stringify(data) : data)
    }

    switch (keyNumber){
        case 0:
            return  set('tempData', data);
        case 1:
            return set('authDetails', data);
        default:
            return set('tempData', data);
    }
}