import moment from 'moment';

export function formatDataString(date){
    try{
        date = date.split('T')[0];

        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];

        return `${day}/${month}/${year}`;

    }catch (e){
        return 'Data não encontrada.';
    }
}
export function formatStringDateGlobal(date) {
    let day  = date.split("/")[0];
    let month  = date.split("/")[1];
    let year  = date.split("/")[2];

    return year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);
}

export function stringToUnix(str){
    if(typeof str === 'object' && typeof str.unix === 'function') return str.unix();

    if(typeof str !== 'string') throw new Error('Invalid date format');
    else return moment(str).unix();
}

export function unixToString(unix){
    if(parseFloat(unix).toString() === unix.toString())
        unix = parseInt(unix);

    if(typeof unix === 'number' && unix.toString().length === 10)
        unix *= 1000;

    return moment(unix).format('DD/MM/YYYY');
}