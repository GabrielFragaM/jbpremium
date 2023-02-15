

export function csvToJSON(text) {
    const [ header, ...rows ] = text.split('\n');
    const headerItems = header.split(',');
    const result = [];
    for(const row of rows){
        const index = (result.push({}) - 1);
        const currRow = result[index];
        const rowData = row.split(',');
        for(const headerIndex in headerItems){
            const currHeader = headerItems[headerIndex];
            currRow[currHeader] = rowData[headerIndex].trim();
        }
    }
    return result;
}

export const imageToBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const validatorFiles = (file, customValidators, maxFileSize) => {

    if(maxFileSize){
        const checkSize = file.size / 1024 / 1024 <= maxFileSize;
        if(!checkSize){
            return null;
        }
    }

    if(customValidators){
        const checkValidator = customValidators.some(type => type === file.type);
        if(checkValidator){
            return {
                file: file,
                type: file.type.toString().split('/')[0]
            };
        }else{
            return null;
        }
    }else{
        return {
            file: file,
            type: file.type.toString().split('/')[0]
        };
    }
};