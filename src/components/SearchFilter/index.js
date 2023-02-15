import React, { useState } from "react";
import {Row, Form, Select, Input, Space, DatePicker} from 'antd';
import {formatDataString, formatStringDateGlobal} from "../../services/date.service";

export default function SearchFilter(props){

  const [activeFilter, setFilter] = useState(props.defaultSearchFilter);

  const { RangePicker } = DatePicker;

  const searchFilters = props.searchFilters;
  const searchData = props.searchData;
  const setFilteredData = props.setFilteredData;

  const handleFilter = async (e) => {

    let keyword;

    if(typeof e === 'object'){
      keyword = e
    }else{
      keyword = e.toString();
    }

    if (keyword !== null && keyword !== "" && activeFilter !== null) {

      function getResultsDate(){
        return searchData.filter(searchData => {
          let date = new Date(formatStringDateGlobal(formatDataString(searchData[activeFilter]))).getTime();
          console.log(formatStringDateGlobal(formatDataString(searchData[activeFilter])));
          console.log(formatDataString(searchData[activeFilter]));
          return date >= new Date(e[0].format()).getTime() && date <= new Date(e[1].format()).getTime();
        });
      }
      function getResultsInput(){
        let re = new RegExp(keyword+'.+$', 'i');

       try{
         return searchData.filter((searchData) => {
           return (searchData[activeFilter].toString().toLowerCase() + 'a').search(re) !== -1;
         });
       }catch (e){}
      }
      let results = [];

      if(activeFilter === 'updatedAtString' || activeFilter === 'createdAtString'){
        results = getResultsDate()
      }else{
        results = getResultsInput()
      }

      setFilteredData(results);
    } else {
      setFilteredData(null);
    }

  };
  return(
      <Form layout="vertical">
        <Row justify={'space-between'} align={'top'}>
          <Space>
            <Form.Item>
              <Select
                  style={{width: "200px"}}
                  placeholder={'Procurar por'}
                  options={searchFilters}
                  onChange={(filter) => setFilter(filter)}
              />
            </Form.Item>
            <Form.Item>
              {
                activeFilter === 'updatedAtString' || activeFilter === 'createdAtString' ?
                    <RangePicker
                        allowClear
                        onChange={(date) => handleFilter(date)}
                    /> : <Input
                        style={{width: "100%"}}
                        placeholder={'Procurar'}
                        allowClear
                        onChange={(text) => handleFilter(text.target.value)}
                    />
              }
            </Form.Item>
          </Space>
          {props.extra !== null ? props.extra : ''}
        </Row>
        {props.extraFilters !== null ? props.extraFilters : ''}
      </Form>
  )
}