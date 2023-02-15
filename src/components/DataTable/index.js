import React from 'react';
import {Row, Table} from 'antd';

function DataTable(props){

    function getColumns(columns){
        let columnsList = [];

        for(let col of columns){
            if(col["sorterName"] !== undefined){
                columnsList.push({
                    ...col,
                    sorter: (a, b) => a[col["sorterName"]].toString().localeCompare(b[col["sorterName"]].toString())
                });
            }else{
                columnsList.push(col);
            }
        }

        return columnsList;
    }

    return(
        <Table
            {...props}
            size="small"
            scroll={{ y: props.heightContent === null ? 400 : props.heightContent, x: true}}
            dataSource={props.dataSource}
            loading={props.loading || props.loadingReload}
            columns={props.actions !== undefined ? [
                    ...getColumns(props.columns),
                    {
                        title: props.titleActions  ?? '',
                        key: 'action',
                        render: (record) => <Row justify='end'>
                            {props.actions(record)}
                        </Row>
                    }
                ].filter(collumn => !collumn.hidden) :
                [
                    ...getColumns(props.columns),
                ].filter(collumn => !collumn.hidden)
            }
        />
    )
}

export default DataTable;