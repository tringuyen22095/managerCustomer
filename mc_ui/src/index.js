import React from 'react';
import ReactDOM from 'react-dom';
import {
    Button, Modal, Table, Container,
    Row, Dropdown, DropdownButton,
    InputGroup, FormControl, Col, Form
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import SelectSearch from 'react-select-search';
import Pagination from "react-js-pagination";
import Loader from 'react-loader-spinner';

import { Customer, Company, Account } from './api';
import { Utils } from './utils';
import { Const } from './const';

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

class ListCustomer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchData: [],
            singleData: {},
            error: null,
            modalIsOpen: false,
            isEdit: false
        };
        this.type = 't';
        this.dFrom = this.dTo = null;
        this.selectedCbx = new Set();

        Customer.searchByKeyword('', this);
        Company.searchByKeyword('', this);
    }

    //Function

    remove(id_s) {
        let type = typeof id_s;
        switch(type) {
            case 'number':
                Customer.remove(id_s, this);
                break;
            default:
                Customer.removes(id_s, this);
        }
    }

    //Function

    //Event

    /**
     * Set data back to state (apply for edit)
     */
    keyUp = (e) => {
        this.setState({
            singleData: {
                id: this.state.singleData.id,
                address: e.target ? (e.target.name === 'txtAddress' ? e.target.value : this.state.singleData.address) : this.state.singleData.address,
                phone: e.target ? (e.target.name === 'txtPhone' ? e.target.value : this.state.singleData.phone) : this.state.singleData.phone,
                email: e.target ? (e.target.name === 'txtEmail' ? e.target.value : this.state.singleData.email) : this.state.singleData.email,
                dob: e.target ? this.state.singleData.dob : (e.value ? this.state.singleData.dob : e),
                company: e.value ? e.value : this.state.singleData.company,
                name: e.target ? (e.target.name === 'txtName' ? e.target.value : this.state.singleData.name) : this.state.singleData.name
            }
        });
    }

    /**
     * Button confirm of modal (use for save/edit)
     * 
     * Prevent action of form
     */
    saveModal = (e) => {
        const form = e.currentTarget;
        if (!this.state.isEdit) {
            Customer.create(form['txtName'].value, form['txtAddress'].value, form['txtPhone'].value,
                form['txtEmail'].value, form['txtDob'].value, form['txtCompany'].value, this);
        }
        else {
            Customer.edit(this.state.singleData.id, form['txtName'].value, form['txtAddress'].value, form['txtPhone'].value,
                form['txtEmail'].value, form['txtDob'].value, form['txtCompany'].value, this);
        }
        e.preventDefault();
        e.stopPropagation();
        this.closeModal();
    }

    /**
     * Use for button change type search & textbox search
     */
    onChange = (event) => {
        let content = event.target.textContent;
        if (content) {
            this.type = this.type === 't' ? 'd' : 't';
            this.dFrom = this.dTo = null;
            this.page = 1;
        }
        let keyword = event.target.value;
        let lst = this.state.data.filter(i => i.name.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 ||
            i.phone.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 ||
            i.address.toUpperCase().indexOf(keyword.toUpperCase()) !== -1);
        this.total = lst.length;
        this.page = 1;
        this.setState({
            searchData: lst
        });
    }

    /**
     * Change show limit item in page & reset page to 1
     */
    onChangeDropdown = (val) => {
        this.show = val;
        this.page = 1;
        this.setState({});
    }

    /**
     * Check button click (Edit/Remove)
     * 
     * Edit: open modal to edit data
     * Remove: delete chosen item from db
     */
    click = (e) => {
        var act = e.target.name;
        if (act) {
            var id = parseInt(act.substring(1, act.length));
            if (act.indexOf('e') !== -1) {
                this.setState({
                    isEdit: true
                });
                Customer.getById(id, this);

                this.openModal();
            }
            else {
                /*var lst = this.state.data;
                lst.filter((val, index) => {
                    if (val.id === id) {
                        lst.splice(index, 1);
                        this.setState({
                            data: lst
                        });
                    }
                });*/
                Const.confirmRemove(id, this);
            }
        }
    }

    /**
     * Use for textbox date from
     */
    onChangeFrom = (d) => {
        this.dFrom = d;
        if (this.dFrom && this.dTo) {
            let lst = this.state.data.filter(i => Date.parse(this.dFrom) <= Date.parse(i.dob) &&
                Date.parse(i.dob) <= Date.parse(this.dTo));
            this.total = lst.length;
            this.setState({
                searchData: lst
            });
            return;
        }
        this.setState({});
    }

    /**
     * Use for textbox date to
     */
    onChangeTo = (d) => {
        this.dTo = d;
        if (this.dFrom && this.dTo) {
            let lst = this.state.data.filter(i => Date.parse(this.dFrom) <= Date.parse(i.dob) &&
                Date.parse(i.dob) <= Date.parse(this.dTo));
            this.total = lst.length;
            this.setState({
                searchData: lst
            });
            return;
        }
        this.setState({});
    }

    /**
     * Redirect to chosen page
     */
    handlePageChange = (pageNumber) => {
        this.page = pageNumber;
        this.setState({});
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

    //Modal

    /**
     * Open modal
     */
    openModal = () => {
        this.setState({
            modalIsOpen: true
        });
    }

    /**
     * Close modal. If edit, reset data
     */
    closeModal = () => {
        if (this.state.isEdit) {
            this.setState({
                singleData: {},
                modalIsOpen: false,
                isEdit: false
            });
        }
        else {
            this.setState({
                modalIsOpen: false
            });
        }
    }

    //Modal

    //Layout

    /**
     * Return data table
     */
    showList() {
        var res = this.state.searchData.slice((this.page - 1) * this.show, this.page * this.show).map((i, index) => (
            <tr key={i.id}>
                <td>
                    {
                        this.selectedCbx.has('' + i.id) ?
                            <Form.Check type="checkbox" checked onChange={this.changeCbx} value={i.id} /> :
                            <Form.Check type="checkbox" onChange={this.changeCbx} value={i.id}/>
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
                <td>{i.companyName}</td>
                <td>
                    <Button variant='outline-dark' name={'e' + i.id} onClick={this.click}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                    </Button>&nbsp;
                    <Button variant='outline-dark' name={'r' + i.id} onClick={this.click}>
                        <FontAwesomeIcon icon={faTrashAlt} /> Remove
                    </Button>
                </td>
            </tr>
        ));
        return res;
    }

    /**
     * return search box base on type select
     */
    searchBox() {
        return this.type === 'd' ?
            (
                <>
                    <DatePicker className='form-control' placeholderText='Choose date from' maxDate={this.dTo}
                        peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" isClearable={true}
                        selected={this.dFrom} onChange={this.onChangeFrom} dateFormat={Const.dateFormat} />
                    <DatePicker className='form-control' placeholderText='Choose date to' minDate={this.dFrom}
                        peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" isClearable={true}
                        selected={this.dTo} onChange={this.onChangeTo} dateFormat={Const.dateFormat} />
                </>
            ) : (
                <FormControl
                    placeholder="Input to search..."
                    onChange={this.onChange} />
            );
    }

    //Layout

    render() {
        const options = [
            { name: 'Swedish', value: 'sv' },
            { name: 'English', value: 'en' },
            {
                type: 'group',
                name: 'Group name',
                items: [
                    { name: 'Spanish', value: 'es' },
                ]
            }
        ];

        return (
            <>
                <Row>
                    <Col xs='4'>
                        <Button variant='outline-dark' onClick={this.openModal}><FontAwesomeIcon icon={faPlus} /> Add Customer</Button>
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
                                <Button variant='outline-dark' onClick={this.onChange}>Change type search</Button>
                            </InputGroup.Append>
                            {this.searchBox()}
                        </InputGroup>
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
                            <DropdownButton title={''+this.show} variant='outline-dark'>
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
                <Modal
                    show={this.state.modalIsOpen}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.isEdit ? 'Edit' : 'Create'} Customer
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.saveModal} name='createFr'>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Label>Name*</Form.Label>
                                        <input type='text' name='txtName' placeholder='Enter Name' required onChange={this.keyUp}
                                            minLength='4' size='64' className='form-control' value={this.state.singleData.name} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Address*</Form.Label>
                                        <input type='text' name='txtAddress' placeholder='Enter Address' required onChange={this.keyUp}
                                            minLength='4' size='128' className='form-control' value={this.state.singleData.address} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Email*</Form.Label>
                                        <input className='form-control' type='text' name='txtEmail' placeholder='Enter Email' required onChange={this.keyUp}
                                            minLength='8' size='128' pattern='[^@]+@[^@]+\.[a-zA-Z]{2,6}' value={this.state.singleData.email} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Phone*</Form.Label>
                                        <input type='text' name='txtPhone' placeholder='Enter Phone' required value={this.state.singleData.phone}
                                            minLength='10' size='10' pattern='^(0\d{9})$' className='form-control' onChange={this.keyUp} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Date of Birth*</Form.Label>
                                        <br />
                                        <DatePicker maxDate={new Date()} name='txtDob' selected={Date.parse(this.state.singleData.dob)}
                                            peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" className='form-control'
                                            onChange={this.keyUp} required placeholderText='Choose Date of Birth' isClearable={true}
                                            dateFormat={Const.dateFormat} />
                                    </Col>
                                    <Col>
                                        <Form.Label>Company</Form.Label>
                                        {/*<input type='number' name='txtCompany' placeholder='Choose Company' required onChange={this.keyUp}
                                            className='form-control' min='1' step='1' value={this.state.singleData.company}/>*/}
                                        <SelectSearch options={this.state.options} name='txtCompany' placeholder='Choose Company'
                                            value={this.state.singleData.company} onChange={this.keyUp} />
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit'>{this.state.isEdit ? 'Save' : 'Create'}</Button>
                            <Button onClick={this.closeModal}>Close</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

}

class DefaultIndex extends React.Component {

    constructor() {
        super();
        let k = localStorage.getItem('key');
        this.state = {
            isLoading: false
        };
        if (!k) {
            this.showModal = true;
        }
        else {
            this.showModal = false;
            this.key = k;
        }
    }

    //Event

    /**
     * Button login
     */
    login = (e) => {
        e.preventDefault();
        let form = e.currentTarget;
        Account.login(form['txtUid'].value, form['txtPwd'].value, this);
    }

    //Event

    //Layout

    /**
     * Check login success to show customer list
     */
    list() {
        if (!this.showModal) {
            return (
                <>
                    <div className='title'>
                        <span className='titleName'>Customer</span>
                        <div>
                            <ListCustomer token={this.key} />
                        </div>
                    </div>
                </>
            );
        }
        return (<> </>);
    }

    //Layout

    render() {
        return (
            <>
                {this.list()}
                {
                    this.state.isLoading ?
                        <div className='fade modal-backdrop show' style={{ zIndex: 2000 }}>
                            <div className='modal-dialog modal-lg modal-dialog-centered' style={{margin: 'auto', width: 'min-content'}}>
                                <Loader type='Puff' color='#00BFFF' height='300' width='300' />
                            </div>
                        </div> : <> </>
                    }
                <Modal
                    show={this.showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Log In
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.login}>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Label>Username*</Form.Label>
                                        <input type='text' name='txtUid' placeholder='Username' required className='form-control' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Password*</Form.Label>
                                        <input type='password' name='txtPwd' placeholder='Password' required className='form-control' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p style={{ color: 'red' }}>
                                            {this.error}
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type='submit'>Log In</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

}

ReactDOM.render(
    <DefaultIndex />,
    document.getElementById('root')
);