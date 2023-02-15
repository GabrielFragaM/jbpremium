import {Row, Form, Select, Space} from 'antd';
import {useState} from "react";
import Icon from "../icon";
import Button from "../Button";

export default function DropDownFilterSubCategory(props){

  const searchFilters = props.searchFilters;
  const searchData = props.searchData;
  const setFilteredData = props.setFilteredData;
  const [filterActive, setFilterActive] = useState(false);
  const [category, setCategory] = useState('');

  const onChange = (filter) => {
    let results = [];

    function getResultsInput(){
      let re = new RegExp(filter+'.+$', 'i');

      try{
        setFilterActive(true);
        return searchData.filter((searchData) => {
          return (searchData['categoryName'].toString() + 'a').search(re) !== -1;
        });
      }catch (e){}
    }

    results = getResultsInput();

    setFilteredData(results);

  };
  console.log(searchFilters.filter(x => x.categoryId === category).map(x => x));
  return(
      <Form layout="vertical">
        <Space>
          <Form.Item>
            <Space>
              <Select
                  key={'category'}
                  loading={props.loading}
                  style={{width: "200px"}}
                  disabled={props.loading}
                  placeholder={'Categorias'}
                  options={props.categories}
                  onChange={(value) => {
                    console.log(value)
                    setCategory(value)
                  }}
              />
              <Select
                  key={'subCategory'}
                  loading={props.loading}
                  style={{width: "200px"}}
                  disabled={props.loading}
                  placeholder={'Sub Categorias'}
                  options={searchFilters.filter(x => x.categoryId === category).map(x => x)}
                  onChange={(filter) => onChange(filter)}
              />
            </Space>
          </Form.Item>
          {
            filterActive ?  <Form.Item><Button
                onClick={() => {
                  setFilteredData(null);
                  setFilterActive(false);
                }}
                icon={<Icon icon={'CloseOutlined'}/>}
            />  </Form.Item>: <></>
          }
        </Space>
      </Form>
  )
}