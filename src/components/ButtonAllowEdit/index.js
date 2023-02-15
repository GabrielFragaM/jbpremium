import React, { Component } from 'react';
import {Button, Space} from "antd";
import Icon from "../icon";

class ButtonAllowEdit extends Component{

    constructor(props){
        super(props);

        this.state = {
            allowEdit: this.props.allowEdit,
            data: this.props.data,
            loading: this.props.loading,
            onCancel: this.props.onCancel,
            onSave: this.props.onSave,
        };
    }

    render(){
        return (
            !(this.props.data.hasOwnProperty('id')) ?
                <Button
                    key={'create'}
                    type="primary"
                    htmlType='submit'
                    icon={<Icon icon={'CheckOutlined'} />}
                    loading={this.props.loading}
                >
                    {'Criar'}
                </Button> :
                <Space>
                    {this.props.allowEdit === true ?
                        <Button
                            key={'cancel'}
                            type="danger"
                            onClick={this.props.onCancel}
                            icon={<Icon icon={'LockOutlined'} />}
                        >
                            {'Cancelar'}
                        </Button> : <></>
                    }
                    <Button
                        key={'save'}
                        type="primary"
                        htmlType='submit'
                        loading={this.props.loading}
                        icon={this.props.allowEdit === false ?<Icon icon={'UnlockOutlined'} /> : <Icon icon={'CheckOutlined'} />}
                    >
                        {this.props.allowEdit === false ? 'Habilitar Edição' : 'Salvar'}
                    </Button>
                </Space>
        )
    }

}

export default ButtonAllowEdit;


