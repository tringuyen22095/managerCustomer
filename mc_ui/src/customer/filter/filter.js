import React from '../../../node_modules/react';
import {
    ListGroup, Button, Modal, Container, Row, Col
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FilterAPI, CompanyAPI } from '../../api/api';
import DatePicker from "react-datepicker";
import SelectSearch from 'react-select-search';
import { Const } from '../../common/const';

export class Filter extends React.Component {

    constructor(props) {
        super(props);
        CompanyAPI.searchByKeyword('', this);
        this.json = Const.jsonCustomer;
        this.component = this.props.component;
        this.activeHref = 'customer';
        let data = this.props.component.getComponent().getData().filter ? this.props.component.getComponent().getData().filter : {filter:''};
        this.cbxSelected = data ? data.filter.split(',') : [];
        this.ref = {
            'All1': React.createRef(),
            'Customer Name': React.createRef(),
            'Phone': React.createRef(),
            'Email': React.createRef(),
            'Address': React.createRef(),
            'Company Name ': React.createRef(),
            'Date of birth ': React.createRef()
        }
        this.options = [{}];
        this.arrAllFilter = this.getAllFilter();
        this.state = {
            showModal: false
        };
        this.filterName = React.createRef();
    }

    componentDidMount() {
        this.init();
    }

    onChangeFrom = () => {
        
    }

    onChangeTo = () => {
        
    }

    getAllFilter() {
        let res = [];
        for (let i in Const.jsonCustomer) {
            res.push(i);
            if (typeof Const.jsonCustomer[i] === 'object') {
                let arr = Const.jsonCustomer[i];
                if (!arr.length) {
                    continue;
                }
                for (let j in arr) {
                    res.push(arr[j]);
                }
            }
        }
        for (let i in Const.jsonCompany) {
            res.push(i);
        }
        return res;
    }

    onSelect = (e) => {
        this.activeHref = e;
        if (e === 'customer') {
            this.json = Const.jsonCustomer;
        }
        else {
            this.json = Const.jsonCompany;
        }
        this.setState({});
    }

    onClearSelection = (e) => {
        e.preventDefault();
        this.cbxSelected = [];
        this.init();
    }

    setValue(val) {
        let index = this.cbxSelected.indexOf(val);
        if (index !== -1) {
            this.cbxSelected.splice(index, 1);
        }
        else {
            this.cbxSelected.push(val);
        }
    }

    onSelectCbxAll = (e) => {
        let target = e.currentTarget;
        let val = target.value;
        this.setValue(val);
        let arr = this.json[target.value];
        if (typeof arr === 'object' && arr.length) {
            arr.map(i => {
                if (target.checked) {
                    if (this.cbxSelected.indexOf(i) === -1) {
                        this.cbxSelected.push(i);
                    }
                }
                else {
                    this.cbxSelected.splice(this.cbxSelected.indexOf(i), 1);
                }
            });
        }
        this.init();
        this.setState({});
    }

    onSelectCbx = (e) => {
        let val = e.currentTarget.value;
        this.setValue(val);
        for (let k in this.json) {
            let value = this.json[k];
            let length = value.length;
            if (typeof value === 'object' && length) {
                let total = 0;
                for (let i in value) {
                    if (this.cbxSelected.indexOf(value[i]) !== -1) { total++; }
                }
                if (length === total) {
                    this.setValue(k);
                }
                else {
                    let found = this.cbxSelected.indexOf(k);
                    if (found !== -1) {
                        this.cbxSelected.splice(found, 1);
                    }
                }
            }
        }
        this.init();
    }

    onApply = () => {
        if (this.cbxSelected[0] === '') {
            this.cbxSelected.shift();
        }
        this.props.component.getComponent().getData().filter.filter = this.cbxSelected.join(',');
    }

    cond(json) {
        var res = [];
        for (let key in json) {
            let val = json[key];
            res.push(
                <div key={key}>
                    <input type='checkbox' className='lv1' value={key} id={key} ref={this.ref[key]} onChange={this.onSelectCbxAll} />
                    <label htmlFor={key}>{key.substring(0, key.length - 1)}</label><br />
                </div>
            );
            if (typeof val === 'object' && val.length) { //Array
                for (let i in val) {
                    res.push(
                        <div key={val[i]}>
                            <input type='checkbox' className='lv2' value={val[i]}  id={val[i]} ref={this.ref[val[i]]} onChange={this.onSelectCbx} />
                            <label htmlFor={val[i]}>{val[i]}</label><br />
                        </div>
                    );
                }
            }
            if (typeof val === 'string') {
                switch (val) {
                    case 'Date':
                        res.push(
                            <div style={{ display: this.ref[key].current && this.ref[key].current.checked ? 'unset' : 'none' }} key={key+val}>
                                <DatePicker className='form-control' placeholderText='Choose date from' maxDate={this.dTo}
                                    peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" isClearable={true}
                                    selected={this.dFrom} onChange={this.onChangeFrom} dateFormat={Const.dateFormat} />
                                <DatePicker className='form-control' placeholderText='Choose date to' minDate={this.dFrom}
                                    peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" isClearable={true}
                                    selected={this.dTo} onChange={this.onChangeTo} dateFormat={Const.dateFormat} />
                            </div>
                        );
                        break;
                    case 'Dropdown':
                        res.push(
                            <div style={{ display: this.ref[key].current && this.ref[key].current.checked ? 'unset' : 'none' }} key={key+val}>
                                <SelectSearch options={this.options} placeholder='Choose Company' onChange={this.keyUp} />
                            </div>
                        );
                        break
                }
            }
        }
        return res;
    }

    init() {
        for (let i in this.arrAllFilter) {
            this.ref[this.arrAllFilter[i]].current.checked = this.cbxSelected.indexOf(this.arrAllFilter[i]) !== -1;
        }
    }

    onSaveFilterSet = (e) => {
        if(this.filterName.current.value) {
            FilterAPI.create(this.filterName.current.value, this.cbxSelected, this);
            this.onCloseModal();
        }
        else {
            this.error = 'Filter name can\'t be empty.';
            this.setState({});
        }
        e.preventDefault();
    }

    onOpenModal = () => {
        this.error = '';
        this.setState({
            showModal: true
        });
    }

    onCloseModal = () => {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <>
                <tbody>
                    <tr>
                        <td style={{ width: '20%' }}>
                            <ListGroup as='ul' onSelect={this.onSelect} defaultActiveKey={this.activeHref}>
                                <ListGroup.Item as='li' href='customer'>Customer</ListGroup.Item>
                                <ListGroup.Item as='li' href='company'>Company</ListGroup.Item>
                            </ListGroup>
                        </td>
                        <td>
                            <div style={{ display: this.activeHref === 'customer' ? 'unset' : 'none' }}>
                                {this.cond(Const.jsonCustomer)}
                            </div>
                            <div style={{ display: this.activeHref === 'company' ? 'unset' : 'none' }}>
                                {this.cond(Const.jsonCompany)}
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='2'>
                            <div style={{ float: 'left', verticalAlign: 'middle', lineHeight: '40px' }}>
                                <Button variant='outline-danger' onClick={this.onOpenModal}>Save as Filter Set</Button>
                            </div>
                            <div style={{ float: 'right', verticalAlign: 'middle', lineHeight: '40px' }}>
                                <a href='#' onClick={this.onClearSelection}>Clear selection</a>
                                <Link to='/customer/' onClick={this.onApply}>
                                    <Button variant='danger'>Apply</Button>
                                </Link>
                            </div>
                            <div style={{ float: 'none' }}></div>
                        </td>
                    </tr>
                </tfoot>
                <Modal
                    show={this.state.showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Save Filter Set
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <label>Name</label>
                                    <input type='text' placeholder='Username' ref={this.filterName} className='form-control' />
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
                        <Link to='/customer/filter/filterSet' onClick={this.onSaveFilterSet}>
                            <Button variant="outline-primary">Save</Button>
                        </Link>
                        <Button variant="outline-danger" onClick={this.onCloseModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}