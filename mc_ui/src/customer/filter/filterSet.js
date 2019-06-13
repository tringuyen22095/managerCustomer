import React from '../../../node_modules/react';
import { FilterAPI } from '../../api/api';
import {
    Button, Row, Col, Accordion, Card
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Const } from '../../common/const';

export class FilterSet extends React.Component {
    constructor(props) {
        super(props);
        this.component = this.props.component;
        this.search('');
        this.dataTags = this.getDataTags(Const.jsonCustomer, {parentTags: [], childTags: []});
        this.dataTags = this.getDataTags(Const.jsonCopmany, this.dataTags);
        this.state = {currentView: 0};
    }

    getDataTags(json, dataTags) {
        for(let key in json) {
            let val = json[key];
            if(typeof val === 'object') { //parent tag
                dataTags.parentTags.push(key);
                for(let i in val) {
                    dataTags.childTags.push(val[i]);
                }
            }
            else {
                dataTags.childTags.push(key);
            }
        }
        return dataTags;
    }

    search = (keyword) => {
        FilterAPI.search(keyword, this);
    }

    filterLayout(filter, type) {
        let res = [];
        let arr = type === 'p' ? this.dataTags.parentTags : this.dataTags.childTags;
        filter.map(val => {
            if(arr.indexOf(val) !== -1) {
                res.push(
                    <li key={val} className="tag">
                        {val}
                    </li>);
            }
        });
        return res;
    }

    onKeyUpSearch = (e) => {
        let val = e.currentTarget.value;
        this.search(val);
    }

    showFilterSet() {
        let res = '';
        if(!this.count || (this.count && this.count === 0)) {
            res = (
                <div style={{lineHeight: 'normal', verticalAlign: 'middle', textAlign: 'center'}}>
                    <p>You don't have any saved filter sets.</p>
                    <p>
                        Select a combination of filters and save them<br />
                        as a set to apply your selection all at once.
                    </p>
                </div>
            );
        }
        else {
            res = (
                <Accordion>
                    <Row>
                        <Col>
                            <input type='text' className='form-control' onKeyUp={this.onKeyUpSearch} placeholder='Search Filter Sets' />
                        </Col>
                        <Col xl={7}></Col>
                    </Row>
                    {this.data.map((i, index) =>
                        (
                            <div key={i.id}>
                                <Row>
                                    <Col>
                                        <div style={{ float: "left" }}>{i.filter.name}</div>
                                        <div style={{ float: "right" }}>
                                            <div className='default' style={{display: i.isDefault ? 'unset' : 'none'}}>
                                                Default
                                                <Link to='#' onClick={(e) => {e.preventDefault()}}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </Link>
                                            </div>
                                            <div className='default' style={{display: !i.isDefault && i.id === this.state.currentView ? 'unset' : 'none'}}>
                                                Set As Default
                                            </div>
                                        </div>
                                        <div style={{ float: "none" }}></div>
                                    </Col>
                                    <Col sm='auto'>
                                        <button className='btnFilter remove' id={i.id} onClick={(e) => {
                                            let id = e.currentTarget.id;
                                            FilterAPI.remove(id, this);
                                        }}>
                                            <FontAwesomeIcon icon={faTimes} />Remove
                                        </button>
                                    </Col>
                                    <Col sm='auto'>
                                        <Accordion.Toggle variant="label" className='btnFilter view' eventKey={index} name={i.id}
                                            onClick={(e) => {
                                                let val = parseInt(e.currentTarget.name);
                                                val = this.state.currentView === val? 0: val;
                                                this.setState({
                                                    currentView: val
                                                });
                                            }}>
                                            <FontAwesomeIcon icon={faEye} />View
                                        </Accordion.Toggle>
                                    </Col>
                                    <Col sm='auto'>
                                        <Button variant="warning">Apply</Button>
                                    </Col>
                                </Row>
                                <Accordion.Collapse eventKey={index}>
                                    <Card.Body style={{padding: '0'}}>
                                        <div className='form'>
                                            <div className='tags'>
                                                <ul style={{ listStyle: 'none' }}>
                                                    {this.filterLayout(i.filter.filter.split(','), 'c')}
                                                </ul>
                                            </div>
                                        </div>
                                        ALL of these tags
                                        <div className='form'>
                                            <div className='tags'>
                                                <ul style={{ listStyle: 'none' }}>
                                                    {this.filterLayout(i.filter.filter.split(','), 'p')}
                                                </ul>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </div>
                        ))
                    }
                </Accordion>
            );
        }

        return res;
    }

    render() {
        return (
            <>
                <tbody>
                    <tr>
                        <td colSpan='2'>
                            {this.showFilterSet()}
                        </td>
                    </tr>
                </tbody>
            </>
        );
    }
}