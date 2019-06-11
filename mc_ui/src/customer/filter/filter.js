import React from '../../../node_modules/react';
import {
    ListGroup, Button
} from 'react-bootstrap';

const jsonCustomer = {
    'All1': ['Customer Name', 'Phone', 'Address', 'Email'],
    'Date of birth ': 'Date'
};

const jsonCompany = {
    'Company Name ': ''
};

export class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.cbxSelected = localStorage.getItem('filter') ? localStorage.getItem('filter').split(',') : [];
        this.json = jsonCustomer;
        this.activeHref = 'customer';
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
        this.setState({});
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
            arr.map(i => target.checked ? this.cbxSelected.push(i) : this.cbxSelected.splice(this.cbxSelected.indexOf(i), 1));
        }
        this.setState({});
    }

    onSelectCbx = (e) => {
        let val = e.currentTarget.value;
        this.setValue(val);
        for (let k in this.json) {
            let value = this.json[k];
            if (typeof value === 'object') {
                let length = value.length;
                if (length) {
                    let total = 0;
                    for (let i in value) {
                        if (this.cbxSelected.indexOf(value[i])) {
                            total++;
                        }
                    }
                    if (length === total) {
                        this.setValue(k);
                    }
                    else {
                        this.cbxSelected.splice(this.cbxSelected.indexOf(k), 1);
                    }
                }
            }
        }
        this.setState({});
    }

    onApply = () => {
        localStorage.setItem('filter', this.cbxSelected);
        window.location.href = '/customer/';
    }

    condCustomer() {
        var res = [];
        for (let k in this.json) {
            let val = this.json[k];
            res.push(this.cbxSelected.indexOf(k) !== -1 ?
                <>
                    <input type='checkbox' className='lv1' value={k} id={k} checked onChange={this.onSelectCbxAll} />
                    <label htmlFor={k}>{k.substring(0, k.length-1)}</label><br />
                </>:
                <>
                    <input type='checkbox' className='lv1' value={k} id={k} onChange={this.onSelectCbxAll} />
                    <label htmlFor={k}>{k.substring(0, k.length - 1)}</label><br />
                </>
            );
            if (typeof val === 'object') {
                if (val.length) { //Array
                    for (let i in val) {
                        res.push(this.cbxSelected.indexOf(val[i]) !== -1 ?
                            <>
                                <input type='checkbox' className='lv2' value={val[i]} checked id={val[i]} onChange={this.onSelectCbx} />
                                <label htmlFor={val[i]}>{val[i]}</label><br />
                            </>:
                            <>
                                <input type='checkbox' className='lv2' value={val[i]} id={val[i]} onChange={this.onSelectCbx} />
                                <label htmlFor={val[i]}>{val[i]}</label><br />
                            </>
                        );
                    }
                }
            }
        }
        return res;
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
                            {this.condCustomer()}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='2'>
                            <div style={{ float: 'left', verticalAlign: 'middle', lineHeight: '40px' }}>
                                <Button variant='outline-danger'>Save as Filter Set</Button>
                            </div>
                            <div style={{ float: 'right', verticalAlign: 'middle', lineHeight: '40px' }}>
                                <a href='#' onClick={this.onClickA}>Clear selection</a>
                                <Button variant='danger' onClick={this.onApply}>Apply</Button>
                            </div>
                            <div style={{ float: 'none' }}></div>
                        </td>
                    </tr>
                </tfoot>
            </>
        );
    }
}