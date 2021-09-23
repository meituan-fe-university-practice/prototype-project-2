import React,  { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Card } from 'antd';
import './page_style.css'
import {Link} from "react-router-dom";

const PageList = (props) => {

    const { pages } = props;

    const rowNumber = (Math.ceil( pages.length / 4));

    const pagesCols = pages.map(
        (item, index) =>
            <Col className="gutter-row" span={6} key={index} >
                <Link to={`/page`} className="card-out">
                <Card hoverable className="page-card" bordered={false} title={item.name}
                      cover={<img style={{width:'230px'}} className="page-icon" alt="pic"
                                  src={"../../006-cat.png"}
                      />}>
                </Card>
                </Link>
            </Col>
    );

    const content =
        <Row gutter={[16+8*5, 0]} >
            {pagesCols}
        </Row>

    return(
        <div className="page-list-container">
            {content}
        </div>
    )
}



export default PageList;