import React from 'react';
import * as icons from '@ant-design/icons';

export default function Icon(props){

    const defaultProps = {
        icon: props.icon ?? 'PushpinOutlined',
    };

    const Icon = (props) => {
        const { icon } = props;
        const antIcon = icons;
        return React.createElement(antIcon[icon]);
    };

    return(
        <>
            <Icon {...defaultProps}/>
        </>
    )
}


