import React from '../../node_modules/react';
import {
    Button, Modal, Form,
    Row, Col, Container
} from '../../node_modules/react-bootstrap';
import Loader from '../../node_modules/react-loader-spinner';
import { AccountAPI } from '../api/api';

class Login extends React.Component {

    constructor(props) {
        super(props);
        let k = localStorage.getItem('key');
        if (!k) {
            this.showModal = true;
        }
        else {
            this.showModal = false;
            window.location.href = '/customer/';
            this.key = k;
        }
        this.isLoading = false;
    }

    //Event

    /**
     * Button login
     */
    login = (e) => {
        e.preventDefault();
        let form = e.currentTarget;
        AccountAPI.login(form['txtUid'].value, form['txtPwd'].value, this);
    }

    //Event

    render() {
        return (
            <>
                {
                    this.isLoading ?
                        <div className='fade modal-backdrop show' style={{ zIndex: 2000 }}>
                            <div className='modal-dialog modal-lg modal-dialog-centered' style={{ margin: 'auto', width: 'min-content' }}>
                                <Loader type='Puff' color='#00BFFF' height='300' width='300' />
                            </div>
                        </div> : <> </>
                }
                <Modal
                    show={this.showModal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Log In
                        </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.login}>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Label>Username*</Form.Label>
                                        <input type='text' name='txtUid' placeholder='Username' required className='form-control' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Label>Password*</Form.Label>
                                        <input type='password' name='txtPwd' placeholder='Password' required className='form-control' />
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
                            <Button type='submit'>Log In</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }

}

export {
    Login
}