import React from '../../node_modules/react';
import {
    Row, Col, ListGroup, Table
} from 'react-bootstrap';

export class FilterCustomer extends React.Component {
    constructor(props) {
        super(props);
        let arr = window.location.pathname.split('/');
        this.pathname = arr[arr.length - 1];
    }

    onSelect = (e) => {
        window.location.href = '/filter/' + e;
    }

    render() {
        return (
            <Row>
                <Col></Col>
                <Col xl='6'>
                    <Row>
                        <Col>
                            <h2>Filter Customer</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th style={{width: '20%'}}>Object</th>
                                        <th>Filter</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <ListGroup as='ul' onSelect={this.onSelect} defaultActiveKey={this.pathname}>
                                                <ListGroup.Item as='li' href='customer'>Customer</ListGroup.Item>
                                                <ListGroup.Item as='li' href='company'>Company</ListGroup.Item>
                                            </ListGroup>
                                        </td>
                                        <td>
                                            //TODO
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
                <Col></Col>
            </Row >
        );
    }
}