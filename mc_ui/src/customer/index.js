import React from '../../node_modules/react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AddCustomer } from './addCustomer';
import { ShowCustomer } from './customer';
import { FilterCustomer } from './filterCustomer';

export class Customer extends React.Component {
    render() {
        return (
            <Router>
                <div className='title'>
                    <span className='titleName'>Customer</span>
                    <div>
                        <Route exact path="/" component={ShowCustomer} />
                        <Route path="/add" component={AddCustomer} />
                        <Route path="/edit/:id" component={AddCustomer} />
                        <Route path="/filter/customer" component={FilterCustomer} />
                        <Route path="/filter/company" component={FilterCustomer} />
                    </div>
                </div>
            </Router>
        );
    }
}