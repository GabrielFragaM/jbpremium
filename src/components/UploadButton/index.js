import React from 'react';
import {Button, Upload} from "antd";
import './style.less';
import {
    csvToJSON,
    imageToBase64,
    validatorFiles
} from "./uploadButtonServices/uploadButtonServices";
import Icon from "../icon";

export default function UploadButton(props){

    const customProps = {
        disabled: props.disabled ?? false,
        showUploadList: false,
        maxCount: 1,
        customValidators: props.customValidators ?? null,
        maxFileSize: props.maxFileSize ?? null,
    };

    function onChange(value){
        try{
            props.getValues(value);
        }catch (e){}
    }

    function convertImage(file){
        imageToBase64(file.file, (url) => {
            onChange(url);
        });
    }

    function convertCSV(file){
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const text = event.target.result;
            const _result = csvToJSON(text);
            onChange(_result);
        };

        fileReader.readAsText(file.file);
    }

    function convertDocx(file){
        onChange(file.file);
    }

    const beforeUpload = (file) => {
        const _result = validatorFiles(file, customProps.customValidators, customProps.maxFileSize);

        if(_result){
            if(_result.type === 'image'){
                convertImage(_result)
            }else if(_result.type === 'text'){
                convertCSV(_result)
            }else{
                convertDocx(_result);
            }
        }

        return true;
    };

    return(
        <>
            <Upload
                {...customProps}
                beforeUpload={beforeUpload}
            >
                <Button disabled={customProps.disabled} icon={<Icon icon={'UploadOutlined'} />}>{'Upload'}</Button>
            </Upload>
        </>
    )
}



