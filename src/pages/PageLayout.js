import React from 'react';

import { Layout } from 'antd';

import { Outlet } from 'react-router-dom';

import PageHeader from '../components/Header';
import SideMenu from '../components/SideMenu';
import './pageLayout.css';

const { Header, Content, Sider } = Layout;

export default function PageLayout() {
  return (
    <>
      <Layout >
        <Header theme="light" style={{ position: 'fixed', zIndex: 10, width: '100%', display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: '#c28219'}}>
          <PageHeader />
        </Header>
        <Layout>
          <Sider
            width={240}
            breakpoint={'lg'}
            theme="light"
            collapsedWidth={0}
            trigger={null}
            className="sider"
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              height: 'calc(100% - 64px)',
              left: 0,
              background: 'white',
              position: 'fixed',
              marginTop: '64px',
            }}
          >
            <SideMenu />
          </Sider>
          <Layout className="pullright">
            <Content className="background">
              <div className="content">
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}
