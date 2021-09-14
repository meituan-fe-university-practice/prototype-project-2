import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './style.css';
import { Layout } from 'antd';
import ProjectList from "../project_list";
import {
    PlusCircleOutlined,
    ClockCircleOutlined,
    RedoOutlined
} from '@ant-design/icons';
import {fetchProjects} from "../../data";

const { Header, Content, Footer } = Layout;

const ViewContainer = () => {
    const [ projects, setProjects ] = useState([]);
    const [ timeFlag, setTimeFlag ] = useState(false);
    const [ alertFlag, setAlertFlag ] = useState(false);

    useEffect(() => {
        setProjects(fetchProjects());
    }, []);

    const sortTimeByTime = () => {
        let tempProjects = projects;
        if (!timeFlag) {
            tempProjects = tempProjects.sort((a, b) => Number(a.time) - Number(b.time));
            setProjects(tempProjects);
            setTimeFlag(true);
        } else {
            tempProjects = tempProjects.sort((a, b) => Number(a.id) - Number(b.id));
            setProjects(tempProjects);
            setTimeFlag(false);
        }
    }

    const addProjectForm = () => {

    }

    return(
        <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <button className="header-left" onClick={sortTimeByTime}>
                        {(!timeFlag) ?
                            <span>
                                <ClockCircleOutlined />
                                时间排序
                            </span>
                            :
                            <span>
                                <RedoOutlined />
                                序号排序
                            </span>
                        }
                    </button>
                    <div className="header-title">
                        项目列表
                    </div>
                    <button className="header-right" onClick={addProjectForm}>
                        <span>
                            <PlusCircleOutlined />
                            添加项目
                        </span>
                    </button>
                </Header>
                {(!alertFlag) ? null:
                    <AddProjectForm />
                }
                <Content className="site-layout-background content-container">
                    <ProjectList projects={projects} />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Author: Breeze-P | Github:
                    <a href="https://github.com/Breeze-P" style={{ whiteSpace: "pre" }}>  https://github.com/Breeze-P</a>
                </Footer>
            </Layout>
        </Layout>
    )
}

export default ViewContainer;