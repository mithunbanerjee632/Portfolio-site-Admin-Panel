import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import Axios from "axios";
import {Col, Container, Row} from "react-bootstrap";


class ContactPage extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
        }
    }

    componentDidMount() {
        Axios.get('/ContactList').then((response)=>{
            this.setState({dataList:response.data})
            console.log(response);
        }).catch((error)=>{

        });
    }


    render() {
        const data=this.state.dataList;

    const columns=[
        {dataField: 'id', text: 'ID'},
        {dataField: 'name', text: 'Name'},
        {dataField: 'email', text: 'Email'},
        {dataField: 'message', text: 'Message'},
    ]



        return (
            <Fragment>
                <Menu>
                    <Container>
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <BootstrapTable keyField='id' data={ data } columns={ columns } pagination={ paginationFactory() }/>
                            </Col>
                        </Row>
                    </Container>
                </Menu>

            </Fragment>
        );
    }
}

export default ContactPage;
