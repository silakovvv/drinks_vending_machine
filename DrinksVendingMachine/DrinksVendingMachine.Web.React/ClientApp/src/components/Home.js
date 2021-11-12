import React, { Component, useState } from 'react';
import {
    Container, Col, Row, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Button, ButtonGroup, ButtonToolbar,
    CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText,
    Table, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfCoins: [],
            depositedAmount: 0,
        };
    }

    componentDidMount() {
        this.populateListOfCoins();
    }

    increaseDepositedAmount(amount) {
        this.setState({ depositedAmount: this.state.depositedAmount + amount });
    }

    render () {
        return (
            <Form>
                <Row>
                    <FormGroup>
                        <Label className="increase-deposited">
                            Внесённая сумма: {this.state.depositedAmount}
                        </Label>
                            {this.state.listOfCoins.map(coin =>
                                <Button
                                    className="btn-coin"
                                    color="warning"
                                    onClick={(evt) => { evt.preventDefault(); this.increaseDepositedAmount(coin.cost); }}>
                                    {coin.schortName}
                                </Button>)}
                    </FormGroup>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Row className="drink-cards">
                            <Card
                                onClick={(evt) => { evt.preventDefault(); this.increaseDepositedAmount(1); }}
                            >
                                <CardImg
                                    alt="Card image cap"
                                    src="https://picsum.photos/318/180"
                                    top
                                    width="100%"
                                />
                                <CardBody>
                                    <CardTitle className="text-center" tag="h5">
                                        Название
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6"
                                    >
                                        Цена:
                                    </CardSubtitle>
                                    <CardText
                                        className="text-muted"
                                    >
                                        Остаток: 
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Row>
                    </Col>
                </Row>
                <Row>
                </Row>
            </Form>
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

    async populateListOfDrinks() {
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
