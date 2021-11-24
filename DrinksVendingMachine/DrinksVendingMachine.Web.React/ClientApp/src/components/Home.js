import React, { Component, useState } from 'react';
import {
    Col, Row, Form, FormGroup, Label, Button, Card, CardImg, CardBody, CardTitle,
    CardSubtitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfCoins: [],
            listOfDrinks: [],
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

        if (!(this.state.depositedAmount === 0)) {
            await this.getChangeInCoins();
        }
        await this.makePurchaseOperation();
        
        this.populateListOfDrinks();
        this.setState({
            selectedDrinks: [],
        })
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
                            {this.state.listOfDrinks.map(drink =>
                                <Card
                                    onClick={(evt) => {
                                        evt.preventDefault(); this.chooseDrink(drink.id, drink.price, drink.balance);
                                    }}
                                >
                                    <div className="container-fluid"
                                        style={{ height: '11em' }}>
                                        <CardImg
                                            className="img-responive"
                                            alt="image of drink"
                                            src={(drink.image === null) ? "https://picsum.photos/318/180" : 'data:image/png;base64,' + drink.image}
                                            top
                                            width="100%"
                                        />
                                    </div>
                                    <CardBody className={this.state.selectedDrinks.includes(drink.id) ? "selected-card" : ""}>
                                        <CardTitle className="text-center" tag="h5">
                                            {drink.name}
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            Цена: {drink.price}
                                        </CardSubtitle>
                                        <CardText
                                            className="text-muted"
                                        >
                                            Остаток: {drink.balance}
                                        </CardText>
                                    </CardBody>
                                </Card>)}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={4}>
                                {!(Object.keys(this.state.changeInCoins).length === 0) && (
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
                            <Col sm={8}>
                                <Row>
                                    {Object.keys(this.state.changeInCoins).map(item => {
                                        let listOfChangeInCoin = [];
                                        for (let i = 1; i <= this.state.changeInCoins[item]; i++) {
                                            listOfChangeInCoin.push(<div className="btn-coin">
                                                {item}
                                            </div>);
                                        }
                                        return listOfChangeInCoin;
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        );
    }

    async populateListOfCoins() {
        const data = await this.executePostRequest('vendingMachine/listOfCoins');
        this.setState({ listOfCoins: data });
    }

    async populateListOfDrinks() {
        const data = await this.executePostRequest('vendingMachine/listOfDrinksWithBalance');
        this.setState({ listOfDrinks: data });
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
        var arrayOfCoinTransactions = [];
        Object.keys(this.state.depositedCoin).map(item => arrayOfCoinTransactions.push(
            {
                'processingDate': new Date(),
                'coinId': parseInt(item),
                'amount': parseInt(this.state.depositedCoin[item]),
            }));
        Object.keys(this.state.changeInCoins).map(item => arrayOfCoinTransactions.push(
            {
                'processingDate': new Date(),
                'coinId': this.state.listOfCoins.filter(coin => coin.schortName === item)[0].id,
                'amount': parseInt(this.state.changeInCoins[item]) * (-1),
            }));
        
        var arrayOfVendingMachineOperations = [];
        this.state.selectedDrinks.map(drink => arrayOfVendingMachineOperations.push(
            {
                'processingDate': new Date(),
                'drinkId': drink,
                'amount': -1,
                'sum': this.state.listOfDrinks.filter(item => item.id === drink)[0].price,
            }));
        
        const response = await fetch('vendingMachine/makePurchaseOperation', {
            method: 'POST',
            headers: {
                'Accept': 'app//lication/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'arrayOfCoinTransactions': arrayOfCoinTransactions,
                'arrayOfVendingMachineOperations': arrayOfVendingMachineOperations
            })
        });
        const result = await response.json();
        console.log(result);
    }

    async getChangeInCoins() {
        let query = 'vendingMachine/change?change=' + encodeURIComponent(this.state.depositedAmount);

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
