import React, { Component, useState } from 'react';
import {
    Container, Col, Row, Form, FormGroup, Input, InputGroup, InputGroupAddon,
    Button, ButtonGroup, ButtonToolbar, Table, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coins: []
        };
    }

  render () {
    return (
        <Row>
            <Row>
                <ButtonToolbar>
                    <ButtonGroup>
                        {this.state.listenerTasks.map(coin =>
                            <Button
                                className="btn-coin"
                                color="warning"
                                onClick={(evt) => { evt.preventDefault(); }}>
                                {coin.ShortName}
                            </Button>}
                    </ButtonGroup>
                </ButtonToolbar>
            </Row>

            <Row>
            </Row>
            <Row>
            </Row>
        </Row>
    );
  }
}
