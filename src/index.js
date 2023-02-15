import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import pt_BR from 'antd/lib/locale/pt_BR';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'antd/dist/antd.variable.min.css';

class Index extends React.Component {

  constructor(props) {
    ConfigProvider.config({
      theme: {
        primaryColor: '#ffae32',
      },
    });
    super(props);
    this.state = {
      locale: pt_BR,
    };
  }

  render() {
    const { locale } = this.state;

    return (
      <ConfigProvider locale={locale}>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </ConfigProvider>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));