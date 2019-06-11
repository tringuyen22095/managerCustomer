import React from '../../node_modules/react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AddCustomer } from './addCustomer';
import { ShowCustomer } from './customer';
import { FilterCustomer } from './filterCustomer';

export class Customer extends React.Component {
    render() {
        return (
            <div className='title'>
                <span className='titleName'>Customer</span>
                <div>
                    <Route exact path="/customer/" component={ShowCustomer} />
                    <Route exact path="/customer/add" component={AddCustomer} />
                    <Route exact path="/customer/edit/:id" component={AddCustomer} />
                    <Route exact path="/customer/filter/" component={FilterCustomer} />
                    <Route exact path="/customer/filter/filterSet" component={FilterCustomer} />
                </div>
            </div>
        );
    }
}