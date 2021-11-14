import React, { Component, useState } from 'react';
import {
    Col, Row, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, Button, ButtonGroup, ButtonToolbar,
    CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfCoins: [],
            dictionaryOfDrinks: [],
            depositedAmount: 0,
            depositedCoin: {},
            changeInCoins: [],
            selectedDrinks: [],
            openFormErrorNotEnoughFunds: false,
        };
    }

    componentDidMount() {
        this.populateListOfCoins();
        this.populateListOfDrinks();
    }

    increaseDepositedAmount(coinId, amount) {
        this.setState({ depositedAmount: this.state.depositedAmount + amount });

        if (this.state.depositedCoin[coinId] === undefined) {
            this.state.depositedCoin[coinId] = 1;
        }
        else {
            this.state.depositedCoin[coinId] += 1;
        }
    }

    chooseDrink(drinkId, price, balance) {
        if (this.state.selectedDrinks.includes(drinkId)) {
            this.setState({
                depositedAmount: this.state.depositedAmount + price,
                selectedDrinks: this.state.selectedDrinks.filter(item => item !== drinkId)
            });
            return;
        }

        if (price > this.state.depositedAmount || balance === 0) {
            this.setState({ openFormErrorNotEnoughFunds: true });
            return;
        }

        this.setState({ depositedAmount: this.state.depositedAmount - price });

        this.state.selectedDrinks.push(drinkId);
        this.setState({ selectedDrinks: this.state.selectedDrinks });
    }

    async confirmPurchase() {
        if (this.state.selectedDrinks.length === 0) {
            return;
        }

        let result = await this.makePurchaseOperation();

        if (!result || this.state.depositedAmount === 0) {
            return;
        }

        this.getChangeInCoins(this.state.depositedAmount);
        this.populateListOfDrinks();
    }

    render () {
        return (
            <Form>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <Row>
                                <Col sm={4}>
                                    <Label className="deposited-amount">
                                        Внесённая сумма: {this.state.depositedAmount}
                                    </Label>
                                </Col>
                                <Col sm={5}>
                                    {this.state.listOfCoins.map(coin =>
                                        <Button
                                            className="btn-coin"
                                            disabled={coin.locked}
                                            onClick={(evt) => { evt.preventDefault(); this.increaseDepositedAmount(coin.id, coin.cost); }}>
                                            {coin.schortName}
                                        </Button>)}
                                </Col>
                                <Col sm={3}>
                                    {!(this.state.selectedDrinks.length === 0) && (
                                        <Button
                                            className="btn-confirmation-purchase"
                                            color="success"
                                            onClick={(evt) => { evt.preventDefault(); this.confirmPurchase(); }}>
                                            Подтвердить
                                        </Button>)}
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Col sm={9}>
                            <Row>
                                {this.state.changeInCoins.map(element => {
                                    let listOfChangeInCoin;
                                    for (let i = 1; i <= element.value; i++) {
                                        listOfChangeInCoin += <Button
                                                                    className="btn-coin"
                                                                    disabled>
                                                                    element.key.schortName
                                                                </Button>
                                    }
                                    return listOfChangeInCoin;
                                })}
                            </Row>
                        </Col>
                        <Col sm={3}>
                            {!(this.state.changeInCoins.length === 0) && (
                                <Button
                                    className="btn-confirmation-purchase"
                                    color="success"
                                    onClick={(evt) => {
                                        evt.preventDefault();
                                        this.setState({
                                            changeInCoins: []
                                        })
                                    }}>
                                    Забрать сдачу
                                </Button>)}
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Modal isOpen={this.state.openFormErrorNotEnoughFunds}>
                        <ModalHeader>Не удалось выбрать напиток.</ModalHeader>
                        <ModalBody>
                            Не хватает внесённых денежных средсв или напитка нет на остатке.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={(evt) => {
                                evt.preventDefault();
                                this.setState({ openFormErrorNotEnoughFunds: false });
                            }}>ОК</Button>
                        </ModalFooter>
                    </Modal>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Row className="drink-cards">
                            {this.state.dictionaryOfDrinks.map(element =>
                                <Card
                                    onClick={(evt) => {
                                        evt.preventDefault(); this.chooseDrink(element.key.Id, element.key.Price, element.value);
                                    }}
                                >
                                    <CardImg
                                        alt="image of drink"
                                        src="https://picsum.photos/318/180"
                                        top
                                        width="100%"
                                    />
                                    <CardBody>
                                        <CardTitle className="text-center" tag="h5">
                                            {element.key.Name}
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            Цена: {element.key.Price}
                                        </CardSubtitle>
                                        <CardText
                                            className="text-muted"
                                        >
                                            Остаток: {element.value}
                                        </CardText>
                                    </CardBody>
                                </Card>)}
                        </Row>
                    </Col>
                </Row>
                <Row>
                </Row>
            </Form>
        );
    }

    async populateListOfCoins() {
        const data = await this.executePostRequest('vendingMachine/listOfCoins');
        this.setState({ listOfCoins: data });
    }

    async populateListOfDrinks() {
        const data = await this.executePostRequest('vendingMachine/dictionaryOfDrinksWithBalance');
        this.setState({ dictionaryOfDrinks: data });
    }

    async executePostRequest(query) {
        const response = await fetch(query, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        return await response.json();
    }

    async makePurchaseOperation() {
        let arrayOfCoinTransactions = [];
        this.state.depositedCoin.map(item => arrayOfCoinTransactions.push(
            {
                'processingDate': new Date(),
                'coinId': item.key,
                'amount': item.value,
            }));

        let arrayOfVendingMachineOperations = [];
        this.state.selectedDrinks.map(drink => arrayOfVendingMachineOperations.push(
            {
                'processingDate': new Date(),
                'drinkId': drink,
                'amount': 1,
                'sum': this.state.dictionaryOfDrinks.filter(item => item.id === drink).price,
            }));

        const response = await fetch('vendingMachine/makePurchaseOperation', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'arrayOfCoinTransactions': arrayOfCoinTransactions,
                'arrayOfVendingMachineOperations': arrayOfVendingMachineOperations
            })
        });
        const result = await response.json();

        return result;
    }

    async getChangeInCoins(change) {
        let query = 'vendingMachine/changeInCoins?change=' + encodeURIComponent(change);

        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        this.setState({
            changeInCoins: data,
            depositedAmount: 0,
        });
    }
}
