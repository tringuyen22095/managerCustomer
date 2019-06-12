import React from '../../../node_modules/react';
import {
    ListGroup, Button
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FilterAPI } from '../../api/api';

const jsonCustomer = {
    'All1': ['Customer Name', 'Phone', 'Address', 'Email'],
    'Date of birth ': 'Date'
};

const jsonCompany = {
    'Company Name ': 'Drowdown'
};

export class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.json = jsonCustomer;
        this.component = this.props.component;
        this.activeHref = 'customer';
        this.cbxSelected = this.component.getComponent().getFilter();
        this.Customer_Name = React.createRef();
        this.ref = {
            'All1': React.createRef(),
            'Customer Name': React.createRef(),
            'Phone': React.createRef(),
            'Email': React.createRef(),
            'Address': React.createRef(),
            'Company Name ': React.createRef(),
            'Date of birth ': React.createRef()
        }

        this.filterCustomer = this.cond(jsonCustomer);
        this.filterCompany = this.cond(jsonCompany);
        this.arrAllFilter = this.getAllFilter();
    }

    componentDidMount() {
        this.test();
    }

    getAllFilter() {
        let res = [];
        for (let i in jsonCustomer) {
            res.push(i);
            if (typeof jsonCustomer[i] === 'object') {
                let arr = jsonCustomer[i];
                if (!arr.length) {
                    continue;
                }
                for (let j in arr) {
                    res.push(arr[j]);
                }
            }
        }
        for (let i in jsonCompany) {
            res.push(i);
        }
        return res;
    }

    onSelect = (e) => {
        this.activeHref = e;
        if (e === 'customer') {
            this.json = jsonCustomer;
        }
        else {
            this.json = jsonCompany;
        }
        this.setState({});
    }

    onClickA = (e) => {
        e.preventDefault();
        this.cbxSelected = [];
        this.test();
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
        this.test();
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
        this.test();
    }

    onApply = () => {
        this.component.getComponent().setFilter(this.cbxSelected);
    }

    cond(json) {
        var res = [];
        for (let k in json) {
            let val = json[k];
            res.push(
                <>
                    <input type='checkbox' className='lv1' value={k} id={k} key={k} ref={this.ref[k]} onChange={this.onSelectCbxAll} />
                    <label htmlFor={k}>{k.substring(0, k.length - 1)}</label><br />
                </>
            );
            if (typeof val === 'object' && val.length) { //Array
                for (let i in val) {
                    res.push(
                        <>
                            <input type='checkbox' className='lv2' value={val[i]} key={val[i]} id={val[i]} ref={this.ref[val[i]]} onChange={this.onSelectCbx} />
                            <label htmlFor={val[i]}>{val[i]}</label><br />
                        </>
                    );
                }
            }
            if (typeof val === 'string') {
                switch (val) {
                    case 'Date':
                        res.push(
                            <>

                            </>
                        );
                        break;
                    case 'Dropdown':
                        res.push(
                            <>

                            </>
                        );
                        break
                }
            }
        }
        return res;
    }

    test() {
        for (let i in this.arrAllFilter) {
            this.ref[this.arrAllFilter[i]].current.checked = this.cbxSelected.indexOf(this.arrAllFilter[i]) !== -1;
        }
    }

    onSave = () => {
        this.component.getComponent().setFilter([]);
        FilterAPI.create('Default Filter Set', this.cbxSelected, this);
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
                                {this.filterCustomer}
                            </div>
                            <div style={{ display: this.activeHref === 'company' ? 'unset' : 'none' }}>
                                {this.filterCompany}
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='2'>
                            <div style={{ float: 'left', verticalAlign: 'middle', lineHeight: '40px' }}>
                                <Link to='/customer/filter/filterSet' onClick={this.onApply}>
                                    <Button variant='outline-danger' onClick={this.onSave}>Save as Filter Set</Button>
                                </Link>
                            </div>
                            <div style={{ float: 'right', verticalAlign: 'middle', lineHeight: '40px' }}>
                                <a href='#' onClick={this.onClickA}>Clear selection</a>
                                <Link to='/customer/' onClick={this.onApply}>
                                    <Button variant='danger'>Apply</Button>
                                </Link>
                            </div>
                            <div style={{ float: 'none' }}></div>
                        </td>
                    </tr>
                </tfoot>
            </>
        );
    }
}