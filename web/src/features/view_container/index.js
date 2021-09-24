import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.css';
import {Button, Layout, PageHeader} from 'antd';
import ProjectList from "../project_list";
import AddProjectForm from "./compontents/add_project_form";
import Page from "../page/index"
import {
    PlusCircleOutlined,
    ClockCircleOutlined,
    RedoOutlined
} from '@ant-design/icons';
import {pages} from "../../data/pages";
import Paragraph from "antd/es/typography/Paragraph";
import PageList from "../page_list";
import LzEditor from 'react-lz-editor'
const the_pages = pages;

const { Header, Content, Footer } = Layout;


const ViewContainer = () => {
    const [ projects, setProjects ] = useState([]);
    const [ timeFlag, setTimeFlag ] = useState(false);
    const [ alertFlag, setAlertFlag ] = useState(false);

    const [pages , setPages ] = useState([]);
    const [editFlag,setEditFlag] = useState(false);

    const [intro,setIntro] = useState("基督教纪念耶稣诞生的重要节日。亦称耶稣圣诞节、主降生节，天主教亦称耶稣圣诞瞻礼。耶稣诞生的日期，" +
        "《圣经》并无记载。公元336年罗马教会开始在12月25日过此节。12月25日原是罗马帝国规定的太阳神诞辰。");


    useEffect(() => {
        fetch("http://localhost:3000/api/base").then(
            res => {
                return res.json();
            }
        ).then(
            data => {
                setProjects(data.data);
            }
        ).catch((e) => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        setPages(the_pages);
    }, []);

    const sortTimeByTime = () => {
        let tempProjects = projects;
        if (!timeFlag) {
            tempProjects = tempProjects.sort((a, b) => {
                const aTime = new Date(a.createdAt);
                const bTime = new Date(b.createdAt);
                return aTime.getTime() - bTime.getTime();
            });
            setProjects(tempProjects);
            setTimeFlag(true);
        } else {
            tempProjects = tempProjects.sort((a, b) => Number(a.id) - Number(b.id));
            setProjects(tempProjects);
            setTimeFlag(false);
        }
    }

    const addProjectForm = () => {
        if(!alertFlag) {
            setAlertFlag(true);
        } else {
            setAlertFlag(false);
        }
    }

    return(
        <Switch>
            <Route exact path="/project">
                <div className="project-wrap">
                    {(!alertFlag) ? null:
                        <div className="cover-black" />
                    }
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
                                <AddProjectForm onSubmit={addProjectForm}/>
                            }
                            <Content className="site-layout-background content-container">
                                <ProjectList projects={projects} />
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Author: Breeze-P | Github:
                                <a href="https://github.com/Breeze-P" style={{ whiteSpace: "pre" }}>  https://github.com/Breeze-P</a>
                            </Footer>
                        </Layout>
                    </Layout>
                </div>
            </Route>
            <Route exact path="/page">
                <Page />
            </Route>
            <Route path="/project/:id">
                <div className="page-wrap">
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="项目"id
                        extra={[
                            <Button key="1" type="primary" onClick={()=>{
                                if(editFlag===false)
                                    setEditFlag(true);
                                else
                                    setEditFlag(false);
                            }}>
                                {(editFlag===false)?
                                    "编辑介绍"
                                    :
                                    "编辑完成"
                                }
                            </Button>,
                        ]}
                    >
                        <Content>
                            <Paragraph>
                                {(!editFlag)?
                                    <>
                                        {intro}
                                    </>

                                    :
                                    <LzEditor active={true} importContent={intro} cbReceiver={setIntro}
                                              undoRedo={false} removeStyle={false} pasetNoStyle={false}

                                              color={false} image={false} video={false} audio={false}
                                              autoSave={false} pasetNoStyle={false}
                                    />
                                }

                            </Paragraph>
                        </Content>

                    </PageHeader>

                    <Content>
                        <PageList pages={pages}/>
                    </Content>

                </div>
            </Route>
            <Redirect from="/*" to="/project"/>
        </Switch>
    )
}

export default ViewContainer;