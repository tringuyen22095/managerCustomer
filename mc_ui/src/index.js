import React from 'react';
import ReactDOM from 'react-dom';

import { Login } from './account/login';

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";


class DefaultIndex extends React.Component {

    render() {
        return (
            <Login />
        );
    }

}

ReactDOM.render(
    <DefaultIndex />,
    document.getElementById('root')
);