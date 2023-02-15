import React, { Component } from 'react';
import {Button, Card} from "antd";
import Icon from "../icon";

class ButtonDelete extends Component{

    constructor(props){
        super(props);

        this.state = {
            allowEdit: this.props.allowEdit,
            title: this.props.title,
            onDelete: this.props.onDelete,
            endpoint: this.props.endpoint,
        };
    }


    render(){
        return (
            <Card
                type="inner"
                bordered={false}
                title={this.props.title}
                extra={<Button
                    type="danger"
                    disabled={!this.props.allowEdit}
                    icon={<Icon icon={'DeleteOutlined'} />}
                    onClick={this.props.onDelete}
                >{'Deletar'}</Button>
                }
            />
        )
    }

}

export default ButtonDelete;


