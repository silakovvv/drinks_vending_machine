import React, { Component, useState } from 'react';
import {
    Container, Col, Row, Form, FormGroup, Input, InputGroup, InputGroupAddon,
    Button, ButtonGroup, ButtonToolbar, Table, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfCoins: []
        };
    }

    componentDidMount() {
        this.populateListOfCoins();
    }

    render () {
        return (
            <Row>
                <Row>
                    {this.state.listOfCoins.map(coin =>
                        <Button
                            className="btn-coin"
                            color="warning"
                            onClick={(evt) => { evt.preventDefault(); }}>
                            {coin.schortName}
                        </Button>)}
                </Row>

                <Row>
                </Row>
                <Row>
                </Row>
            </Row>
        );
    }

    async populateListOfCoins() {
        const response = await fetch('vendingMachine/listOfCoins', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        const data = await response.json();
        this.setState({ listOfCoins: data });
    }
}
