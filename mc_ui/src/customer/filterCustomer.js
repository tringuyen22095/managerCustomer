import React from '../../node_modules/react';
import {
    Row, Col, Table, ButtonGroup,
    Button, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Route, Link } from "react-router-dom";
import { Filter } from './filter/filter';
import { FilterSet } from './filter/filterSet';

export class FilterCustomer extends React.Component {
    constructor(props) {
        super(props);
    }

    getComponent = () => {
        return this.props.component;
    }

    render() {
        return (
            <Row>
                <Col></Col>
                <Col xl='6'>
                    <Row>
                        <Col>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th colSpan='2'>
                                            <div>
                                                <div style={{ float: 'left', verticalAlign: 'middle', lineHeight: '40px' }}>Customer Listing Filter</div>
                                                <div style={{ float: 'right', verticalAlign: 'middle', lineHeight: '40px' }}>
                                                    <ButtonGroup>
                                                        <Link to='/customer/filter/'>
                                                            <Button>Filter</Button>
                                                        </Link>
                                                        <Link to='/customer/filter/filterSet' >
                                                            <Button>Filter Sets</Button>
                                                        </Link>
                                                    </ButtonGroup>
                                                    <OverlayTrigger
                                                        key={'bottom'}
                                                        placement={'bottom'}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${'bottom'}`}>
                                                                Helptext.
                                                            </Tooltip>
                                                        }>
                                                        <FontAwesomeIcon icon={faInfoCircle} size='2x' />
                                                    </OverlayTrigger>
                                                </div>
                                                <div style={{ float: 'none' }}></div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <Route exact path="/customer/filter/filterSet" component={() => <FilterSet component={this} />} />
                                <Route exact path="/customer/filter/" component={() => <Filter component={this} />} />
                            </Table>
                        </Col>
                    </Row>
                </Col>
                <Col></Col>
            </Row >
        );
    }
}