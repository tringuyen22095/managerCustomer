import React from '../../node_modules/react';
import {
    Button, Table, Row, Dropdown, DropdownButton,
    InputGroup, FormControl, Col, Form
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-js-pagination';

import { CustomerAPI } from '../api/api';

import { Utils } from '../common/utils';
import { Const } from '../common/const';

export class ShowCustomer extends React.Component {

    constructor(props) {
        super(props);
        this.data = [];
        this.type = 't';
        this.dFrom = this.dTo = null;
        this.selectedCbx = new Set();
        this.filter = this.init();
        this.show = 5;
        this.page = 1;

        CustomerAPI.searchByKeyword(this);
    }

    //Function

    init() {
        let data = this.props.component.getData().filter;
        console.log(this.props.component.getData());
        return data ? data.filter : '';
    }

    remove(id_s) {
        let type = typeof id_s;
        switch (type) {
            case 'number':
                CustomerAPI.remove(id_s, this);
                break;
            default:
                CustomerAPI.removes(id_s, this);
        }
    }

    //Function

    //Event

    /**
     * Use for button change type search & textbox search
     */
    onChange = (event) => {
        this.searchText = event.target.value;
        CustomerAPI.searchByKeyword(this);
    }

    /**
     * Change show limit item in page & reset page to 1
     */
    onChangeDropdown = (val) => {
        this.show = val;
        CustomerAPI.searchByKeyword(this);
    }

    /**
     * Check button click (Edit/Remove)
     * 
     * Edit: open modal to edit data
     * Remove: delete chosen item from db
     */
    click = (e) => {
        var act = e.target.name;
        var id = parseInt(act.substring(1, act.length));
        Const.confirmRemove(id, this);
    }

    /**
     * Redirect to chosen page
     */
    handlePageChange = (pageNumber) => {
        this.page = pageNumber;
        CustomerAPI.searchByKeyword(this);
    }

    /**
     * Get data when click cbx
     */
    changeCbx = (e) => {
        let val = e.currentTarget.value;
        if (this.selectedCbx.has(val)) {
            this.selectedCbx.delete(val);
        }
        else {
            this.selectedCbx.add(val);
        }
        this.setState({});
    }

    removes = () => {
        Const.confirmRemove(this.selectedCbx, this);
    }

    //Event

    //Layout

    /**
     * Return data table
     */
    showList() {
        var res = this.data.map((i, index) => (
            <tr key={i.id}>
                <td>
                    {
                        this.selectedCbx.has('' + i.id) ?
                            <Form.Check type="checkbox" checked onChange={this.changeCbx} value={i.id} /> :
                            <Form.Check type="checkbox" onChange={this.changeCbx} value={i.id} />
                    }
                </td>
                <td>
                    {(this.page - 1) * this.show + index + 1}
                </td>
                <td>{i.name}</td>
                <td>{i.phone}</td>
                <td>{i.address}</td>
                <td>{i.email}</td>
                <td>{Utils.formatDate(i.dob)}</td>
                <td>{i.company.name}</td>
                <td>
                    <Link to={'/customer/edit/' + i.id}>
                        <Button variant='outline-dark' name={'e' + i.id}>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                        </Button>
                    </Link>&nbsp;
                    <Button variant='outline-danger' name={'r' + i.id} onClick={this.click}>
                        <FontAwesomeIcon icon={faTrashAlt} /> Remove
                    </Button>
                </td>
            </tr>
        ));
        return res;
    }

    filterLayout() {
        let res = [];
        if (this.filter === '') {
            return res;
        }
        this.filter.split(',').map(val => {
            res.push(<li key={val} className="tag">
                {val}
            </li>);
        });
        return res;
    }

    /**
     * return search box base on type select
     */
    searchBox() {
        console.log(this.filter);
        return this.filter.length !== 0 ? <FormControl
                    placeholder="Input to search..."
                    onChange={this.onChange} /> : <> </>
    }

    //Layout

    render() {
        return (
            <>
                <Row>
                    <Col xs='4'>
                        <Link to='/customer/add'>
                            <Button variant='outline-dark' onClick={this.openModal}><FontAwesomeIcon icon={faPlus} /> Add Customer</Button>
                        </Link>
                        {
                            this.selectedCbx.size ?
                                <>
                                    &nbsp;<Button variant='outline-danger' onClick={this.removes}><FontAwesomeIcon icon={faTrashAlt} /> Removes</Button>
                                </> : <></>
                        }
                    </Col>
                    <Col>
                        <InputGroup>
                            <InputGroup.Append>
                                <Link to='/customer/filter/'>
                                    <Button variant='outline-dark'>Filter</Button>
                                </Link>
                            </InputGroup.Append>
                            {this.searchBox()}
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='form'>
                            <div className='tags'>
                                <ul style={{listStyle: 'none'}}>
                                    {this.filterLayout()}
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th colSpan='2'>No.</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Date Of Birth</th>
                            <th>Company</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showList()}
                    </tbody>
                </Table>
                <Row>
                    <Col>
                        <div style={{ float: 'left', fontSize: '28px' }}>Show&nbsp;</div>
                        <div style={{ float: 'left' }}>
                            <DropdownButton title={'' + this.show} variant='outline-dark'>
                                <Dropdown.Item eventKey="5" onSelect={this.onChangeDropdown}>5</Dropdown.Item>
                                <Dropdown.Item eventKey="10" onSelect={this.onChangeDropdown}>10</Dropdown.Item>
                                <Dropdown.Item eventKey="15" onSelect={this.onChangeDropdown}>15</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div style={{ float: 'none', fontSize: '28px' }}>&nbsp;Items</div>
                    </Col>
                    <Col>
                        <Pagination
                            activePage={this.page}
                            itemsCountPerPage={this.show}
                            totalItemsCount={this.total}
                            onChange={this.handlePageChange} />
                    </Col>
                </Row>
            </>
        );
    }
}