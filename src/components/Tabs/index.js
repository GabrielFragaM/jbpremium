import React from 'react';
import {Space, Tabs as AntTabs} from "antd";

export default function Tabs(props){

    const customProps = {
        children: props.children ?? <></>,
        defaultActiveKey: props.defaultActiveKey ?? '1',
        tabBarExtraContent: props.tabBarExtraContent ?? <></>
    };

    const { TabPane } = AntTabs;

    return(
        <>
            <AntTabs
                defaultActiveKey={customProps.defaultActiveKey}
                tabBarExtraContent={customProps.tabBarExtraContent}
            >
                {customProps.children.map((tab) => {
                    if(tab.show === true){
                        return (<TabPane
                            key={tab.key}
                            tab={
                                <Space>
                                    {tab.icon !== null ? tab.icon : <></>}
                                    {tab.title !== null ? tab.title : <></>}
                                    {tab.subTitle !== null ? tab.subTitle : <></>}
                                </Space>
                            }
                        >
                            {
                                tab.child
                            }
                        </TabPane>);
                    }else{
                        return (<></>);
                    }
                })}
            </AntTabs>
        </>
    )
}



