import React,  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col, Card } from 'antd';
import './style.css'

const { Meta } = Card;

const ProjectList = (props) => {
    const { projects } = props;

    const rowNumber = (Math.ceil( projects.length / 4));

    const projectsCols = projects.map((item, index) =>
        <Col className="gutter-row" span={6} key={index} >
            <Link to={`/project/${item.id}`} className="card-out">
                <Card className="project-card" bordered={false} title={item.name}
                      cover={<img className="card-icon" alt="项目图片" src="https://s0.meituan.net/bs/fe-web-meituan/10afbf1/img/logo.png" />}>
                    <Meta title={item.desc} description={new Date(parseInt(item.time) * 1000).toLocaleDateString()} />
                </Card>
            </Link>
        </Col>
    );

    const content =
        <Row gutter={[8 * rowNumber, 24]} >
            {projectsCols}
        </Row>

    return(
        <div className="project-list-container">
            {content}
        </div>
    )
}

export default ProjectList;