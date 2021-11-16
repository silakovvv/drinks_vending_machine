import React, { Component, useState } from 'react';
import {
    Col, Row, Input, InputGroup, InputGroupAddon, TabContent, TabPane, Nav, NavItem, NavLink,
    Form, FormGroup, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import classnames from 'classnames';
import { DrinkPage } from './DrinkPage';

export class AdministrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfCoins: [],
            listOfDrinks: [],
            openFormForChangeBalance: false,
            activeTab: '1',
            paramToChangeBalance: {
                nameOperation: '',
                nameObject: '',
                recordId: 0,
                isDecrease: null,
                methodName: '',
            },
            createDrink: false,
            selectedDrink: 0
        };
    }

    componentDidMount() {
        this.populateListOfCoins();
        this.populateListOfDrinks();
    }

    toggleTabPane = tab => {
        if (this.activeTab !== tab) this.setState({ activeTab: tab });
    }

    saveDrink = () => {
        this.setState({ createDrink: false, selectedDrink: 0 });
        this.populateListOfDrinks();
    }

    render() {
        if (this.state.createDrink) {
            return (
                <DrinkPage saveDrink={this.saveDrink} drinkId={this.state.selectedDrink} />
            );
        }

        return (
            <Col sm={12}>
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggleTabPane('1'); }}>
                                Монеты
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggleTabPane('2'); }}>
                                Напитки
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <FormGroup>
                                <Row>
                                    <Table className='table table-striped' aria-labelledby="tabelLabel">
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th className="text-center">Название</th>
                                                <th className="text-center">Короткое название</th>
                                                <th className="text-center">Номинал</th>
                                                <th className="text-center">Заблокирована</th>
                                                <th className="text-center">Баланс</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listOfCoins.map(coin =>
                                                <tr key={coin.id}>
                                                    <th scope="row">{coin.id}</th>
                                                    <td>{coin.name}</td>
                                                    <td>{coin.schortName}</td>
                                                    <td>{coin.cost}</td>
                                                    <td>
                                                        <Input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="isLockedCoin"
                                                            checked={coin.locked ? true : false}
                                                            onChange={(evt) => { this.changeFlagLocked(coin.id, !coin.locked) }}
                                                        />
                                                    </td>
                                                    <td>{coin.Balance}</td>
                                                    <td>
                                                        <Row>
                                                            <Button color="danger" style={{ margin: 2 }}
                                                                onClick={(evt) => {
                                                                    evt.preventDefault();
                                                                    this.setState({
                                                                        paramToChangeBalance: {
                                                                            nameOperation: 'Уменьшение',
                                                                            nameObject: coin.name,
                                                                            recordId: coin.id,
                                                                            isDecrease: true,
                                                                            methodName: 'changeCoinBalance',
                                                                        },
                                                                        openFormForChangeBalance: true,
                                                                    });
                                                                }}>-</Button>
                                                            <Button color="success" style={{ margin: 2 }}
                                                                onClick={(evt, coin) => {
                                                                    evt.preventDefault();
                                                                    this.setState({
                                                                        paramToChangeBalance: {
                                                                            nameOperation: 'Увеличение',
                                                                            nameObject: coin.name,
                                                                            recordId: coin.id,
                                                                            isDecrease: false,
                                                                            methodName: 'changeCoinBalance',
                                                                        },
                                                                        openFormForChangeBalance: true,
                                                                    });
                                                                }}>+</Button>
                                                        </Row>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Row>
                            </FormGroup>
                        </TabPane>
                        <TabPane tabId="2">
                            <FormGroup>
                                {false && (<Row>
                                    <Col sm={12}>
                                        <div className="text-right">
                                            <Button
                                                color="success" style={{ padding: 10 }}
                                                onClick={(evt) => {
                                                    evt.preventDefault();
                                                    this.setState({ createDrink: true, selectedDrink: 0 });
                                                }}>Добавить напиток</Button>
                                        </div>
                                    </Col>
                                </Row>)}
                                <Row>
                                    <Table className='table table-striped' aria-labelledby="tabelLabel">
                                        <thead>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th className="text-center">Название</th>
                                                <th className="text-center">Описание</th>
                                                <th className="text-center">Цена</th>
                                                <th className="text-center">Остаток</th>
                                                <th className="text-right">
                                                    <Button
                                                        color="success" style={{ paddingLeft: 5, paddingRight: 5 }}
                                                        onClick={(evt) => {
                                                            evt.preventDefault();
                                                            this.setState({ createDrink: true, selectedDrink: 0 });
                                                        }}>
                                                        Добавить напиток
                                                    </Button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listOfDrinks.map(drink =>
                                                <tr key={drink.id}>
                                                    <th scope="row">{drink.id}</th>
                                                    <td>{drink.name}</td>
                                                    <td>{drink.description}</td>
                                                    <td>{drink.Price}</td>
                                                    <td>{drink.Balance}</td>
                                                    <td>
                                                        <Row>
                                                            <Button color="danger" style={{ margin: 2 }}
                                                                onClick={(evt, drink) => {
                                                                    evt.preventDefault();
                                                                    this.setState({
                                                                        paramToChangeBalance: {
                                                                            nameOperation: 'Уменьшение',
                                                                            nameObject: drink.name,
                                                                            recordId: drink.id,
                                                                            isDecrease: true,
                                                                            methodName: 'changeDrinkBalance',
                                                                        },
                                                                        openFormForChangeBalance: true,
                                                                    });
                                                                }}>-</Button>
                                                            <Button color="success" style={{ margin: 2 }}
                                                                onClick={(evt, drink) => {
                                                                    evt.preventDefault();
                                                                    this.setState({
                                                                        paramToChangeBalance: {
                                                                            nameOperation: 'Увеличение',
                                                                            nameObject: drink.name,
                                                                            recordId: drink.id,
                                                                            isDecrease: true,
                                                                            methodName: 'changeDrinkBalance',
                                                                        },
                                                                        openFormForChangeBalance: true,
                                                                    });
                                                                }}>+</Button>
                                                            <Button color="primary" style={{ margin: 2 }}
                                                                onClick={(evt) => {
                                                                    evt.preventDefault();
                                                                    this.setState({ createDrink: true, selectedDrink: drink.id });
                                                                }}>Редактировать</Button>
                                                        </Row>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Row>
                            </FormGroup>
                        </TabPane>
                    </TabContent>
                </div>
                <div>
                    <Modal isOpen={this.state.openFormForChangeBalance}>
                        <ModalHeader>{this.state.paramToChangeBalance.nameOperation} баланс записи: {this.state.paramToChangeBalance.nameObject}.</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <InputGroup>
                                        <Input
                                            name="amountToChangeBalance"
                                            id="amountToChangeBalance"
                                            placeholder="Укажите количество..."
                                        />
                                        <InputGroupAddon addonType="append">
                                            <Button
                                                color="primary"
                                                onClick={(evt) => { evt.preventDefault(); this.changeBalance(document.getElementById("amountToChangeBalance").value); }}>
                                                {this.state.paramToChangeBalance.nameOperation}
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </Modal>
                </div>
            </Col>
        );
    }

    async populateListOfCoins() {
        const data = await this.executePostRequest('administration/listOfCoinsWithBalance');
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

    async changeFlagLocked(coinId, locked) {
        let query = 'administration/changeSignIsLockedForCoin?coinId=' + encodeURIComponent(coinId)
                  + '&locked' + encodeURIComponent(locked);

        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();

        this.populateListOfCoins();
    }

    async changeBalance(amount) {
        let query = 'administration/' + this.state.paramToChangeBalance.methodName;

        let recordId = this.state.paramToChangeBalance.recordId;
        let coefficientAmount = (this.state.paramToChangeBalance.isDecrease ? -1 : 1);

        let requestBody = this.state.paramToChangeBalance.methodName === 'changeCoinBalance'
            ? {
                'processingDate': new Date(),
                'coinId': recordId,
                'amount': amount * coefficientAmount,
            }
            : {
                'processingDate': new Date(),
                'drinkId': recordId,
                'amount': amount * coefficientAmount,
                'sum': amount * this.state.listOfDrinks.filter(item => item.id === recordId)[0].price,
            };

        const response = await fetch(query, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const result = await response.json();

        this.setState({
            paramToChangeBalance: {
                nameOperation: '',
                nameObject: '',
                recordId: 0,
                isDecrease: null,
                methodName: '',
            },
            openFormForChangeBalance: false,
        });

        if (this.state.paramToChangeBalance.methodName === 'changeCoinBalance') {
            this.populateListOfCoins();
        }
        else {
            this.populateListOfDrinks();
        }
    }
}
