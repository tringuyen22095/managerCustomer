import React from 'react';
import ReactDOM from 'react-dom';

import { Login } from './account/login';
import { FilterAPI } from './api/api';
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Customer } from './customer/index';

class DefaultIndex extends React.Component {

    constructor() {
        super();
        this.data = {};
        FilterAPI.findDefault(this);
    }

    setData = (value) => {
        this.data = value;
    }

    getData = () => {
        return this.data;
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={Login} />
                <Route exact path="/customer/" component={() => <Customer component={this} />} />
                <Route exact path="/customer/add" component={() => <Customer component={this} />} />
                <Route exact path="/customer/edit/:id" component={() => <Customer component={this} />} />
                <Route exact path="/customer/filter/" component={() => <Customer component={this} />} />
                <Route exact path="/customer/filter/filterSet" component={() => <Customer component={this} />} />
            </Router>
        );
    }

}

ReactDOM.render(
    <DefaultIndex />,
    document.getElementById('root')
);