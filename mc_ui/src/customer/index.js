import React from '../../node_modules/react';
import { Route } from "react-router-dom";
import { AddCustomer } from './addCustomer';
import { ShowCustomer } from './customer';
import { FilterCustomer } from './filterCustomer';

export class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.component = this.props.component;
    }

    render() {
        return (
            <div className='title'>
                <span className='titleName'>Customer</span>
                <div>
                    <Route exact path="/customer/" component={() => <ShowCustomer component={this.component} />} />
                    <Route exact path="/customer/add" component={() => <AddCustomer />} />
                    <Route exact path="/customer/edit/:id" component={() => <AddCustomer />} />
                    <Route exact path="/customer/filter/" component={() => <FilterCustomer component={this.component} />} />
                    <Route exact path="/customer/filter/filterSet" component={() => <FilterCustomer component={this.component} />} />
                </div>
            </div>
        );
    }
}