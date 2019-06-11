import React from 'react';
import ReactDOM from 'react-dom';

import { Login } from './account/login';

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Customer } from './customer/index';

class DefaultIndex extends React.Component {

    render() {
        return (
            <Router>
                <Route exact path="/" component={Login} />
                <Route exact path="/customer/" component={Customer} />
                <Route exact path="/customer/add" component={Customer} />
                <Route exact path="/customer/edit/:id" component={Customer} />
                <Route exact path="/customer/filter/" component={Customer} />
                <Route exact path="/customer/filter/filterSet" component={Customer} />
            </Router>
        );
    }

}

ReactDOM.render(
    <DefaultIndex />,
    document.getElementById('root')
);