import React from '../../node_modules/react';
import {
    Row, Col, Form, Button
} from 'react-bootstrap';
import { CompanyAPI, CustomerAPI } from '../api/api';
import DatePicker from 'react-datepicker';
import SelectSearch from 'react-select-search';
import { Const } from '../common/const';

export class AddCustomer extends React.Component {

    constructor(props) {
        super(props);
        this.options = [{}];
        CompanyAPI.searchByKeyword('', this);
        let id = this.props.match.params.id;
        this.data = {
            'name': '',
            'address': '',
            'phone': '',
            'email': '',
            'company': {
                'id': null
            },
            'dob': new Date()
        }
        if (id) {
            CustomerAPI.getById(id, this);
        }
    }

    keyUp = (e) => {
        this.data = {
            id: this.data.id,
            address: e.target ? (e.target.name === 'txtAddress' ? e.target.value : this.data.address) : this.data.address,
            phone: e.target ? (e.target.name === 'txtPhone' ? e.target.value : this.data.phone) : this.data.phone,
            email: e.target ? (e.target.name === 'txtEmail' ? e.target.value : this.data.email) : this.data.email,
            dob: e.target ? this.data.dob : (e.value ? this.data.dob : e),
            company: {
                id: e.value ? e.value : this.data.company.id
            },
            name: e.target ? (e.target.name === 'txtName' ? e.target.value : this.data.name) : this.data.name
        };
        this.setState({});
    }

    close = () => {
        window.location.href = '/customer/';
    }

    remove(id) {
        CustomerAPI.remove(id, this);
        this.close();
    }

    onRemove = () => {
        var id = parseInt(this.props.match.params.id);
        Const.confirmRemove(id, this);
    }

    onSaveAndContinue = () => {
        let req = {
            "name": this.data.name,
            "address": this.data.address,
            "phone": this.data.phone,
            "email": this.data.email,
            "dob": Date.parse(this.data.dob),
            "company": {
                id: parseInt(this.data.company.id)
            }
        };
        this.data = {
            'name': '',
            'address': '',
            'phone': '',
            'email': '',
            'company': {
                'id': null
            },
            'dob': new Date()
        }
        CustomerAPI.create(req, this);
    }

    onSubmit = (e) => {
        e.preventDefault();
        let id = this.props.match.params.id;
        let req = {
            "name": this.data.name,
            "address": this.data.address,
            "phone": this.data.phone,
            "email": this.data.email,
            "dob": Date.parse(this.data.dob),
            "company": {
                id: parseInt(this.data.company.id)
            }
        };
        if(!id) {
            CustomerAPI.create(req, this);
            this.close();
        }
        else {
            CustomerAPI.edit(id, req, this);
        }
    }

    render() {
        return (
            <Row>
                <Col></Col>
                <Col xl='6'>
                    <Form onSubmit={this.onSubmit}>
                        <Row>
                            <Col>
                                <h2>Infomation Customer</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Name*</Form.Label>
                                <input type='text' name='txtName' placeholder='Enter Name' required value={this.data.name}
                                    minLength='4' size='64' className='form-control' onChange={this.keyUp}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Address*</Form.Label>
                                <input type='text' name='txtAddress' placeholder='Enter Address' required value={this.data.address}
                                    minLength='4' size='128' className='form-control' onChange={this.keyUp}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Email*</Form.Label>
                                <input className='form-control' type='text' name='txtEmail' placeholder='Enter Email' required
                                    minLength='8' size='128' pattern='[^@]+@[^@]+\.[a-zA-Z]{2,6}' value={this.data.email} onChange={this.keyUp}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Phone*</Form.Label>
                                <input type='text' name='txtPhone' placeholder='Enter Phone' required value={this.data.phone}
                                    minLength='10' size='10' pattern='^(0\d{9})$' className='form-control' onChange={this.keyUp}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Date of Birth*</Form.Label>
                                <br />
                                <DatePicker maxDate={new Date()} name='txtDob' selected={this.data.dob} onChange={this.keyUp}
                                    peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" className='form-control'
                                    required placeholderText='Choose Date of Birth' isClearable={true}
                                    dateFormat={Const.dateFormat}/>
                            </Col>
                            <Col>
                                <Form.Label>Company</Form.Label>
                                <SelectSearch options={this.options} name='txtCompany' placeholder='Choose Company'
                                    value={this.data.company.id} onChange={this.keyUp}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {
                                    !this.props.match.params.id ?
                                        (<>
                                            <Button variant='primary' type='submit'>Save</Button>&nbsp;
                                            <Button variant='primary' onClick={this.onSaveAndContinue}>Save and continue</Button>
                                        </>)
                                        :
                                        (<>
                                            <Button variant='primary' type='submit'>Save</Button>&nbsp;
                                            <Button variant='danger' onClick={this.onRemove}>Remove</Button>
                                        </>)
                                
                            }
                                &nbsp;<Button variant='outline-dark' onClick={this.close}>Close</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        );
    }
}