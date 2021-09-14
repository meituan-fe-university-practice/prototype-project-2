import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import {Layout} from 'antd';
import ProjectList from "../project_list";

const { Header, Content, Footer } = Layout;

const ViewContainer = () => {
    return(
        <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <h1 className="backstage-title">
                        项目列表
                    </h1>
                </Header>
                <Content className="site-layout-background content-container">
                    <ProjectList />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Author: Breeze-P Github:
                    <a href="https://github.com/Breeze-P" style={{ whiteSpace: "pre" }}>  https://github.com/Breeze-P</a>
                </Footer>
            </Layout>
        </Layout>
    )
}

export default ViewContainer;