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
            authorizationCompleted: null,
            listOfCoins: [],
            listOfDrinks: [],
            openFormForChangeBalance: false,
            activeTab: '1',
            paramToChangeBalance: {
                methodName: '',
                nameObject: '',
                recordId: 0,
            },
            createDrink: false,
            selectedDrink: 0
        };
    }

    componentDidMount() {
        this.checkauthorization();
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
                 <DrinkPage saveDrink={this.saveDrink} drinkId={this.state.selectedDrink} authorizationCompleted={this.state.authorizationCompleted} />
            );
        }

        if (this.state.authorizationCompleted === null) {
            return (
                <Col sm={12}>
                    <Row>
                        Загрузка...
                    </Row>
                </Col>
            );
        }
        else if(this.state.authorizationCompleted === false) {
            return (
                <Col sm={12}>
                    <Row style={{ fontSize: '1.3em' }}>
                        Не удалось получить доступ к странице администрирования. Указан неверный ключ.
                    </Row>
                </Col>
            );
        }
        else {
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
                                        <Col sm={12}>
                                            <Table className='table table-striped' aria-labelledby="tabelLabel">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        <th className="text-center">Название</th>
                                                        <th className="text-center">Короткое название</th>
                                                        <th className="text-center">Номинал</th>
                                                        <th className="text-center">Заблокирована</th>
                                                        <th className="text-center">Баланс</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.listOfCoins.map(coin =>
                                                        <tr key={coin.id}>
                                                            <th scope="row">{coin.id}</th>
                                                            <td>{coin.name}</td>
                                                            <td className="text-center">{coin.schortName}</td>
                                                            <td className="text-center">{coin.cost}</td>
                                                            <td className="text-center">
                                                                <Input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="isLockedCoin"
                                                                    checked={coin.locked ? true : false}
                                                                    onChange={(evt) => { this.changeFlagLocked(coin.id, !coin.locked) }}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Col sm={12}>
                                                                    <Row>
                                                                        <Col sm={4} className="text-center">{coin.balance}</Col>
                                                                        <Col sm={8}>
                                                                            <Button color="primary"
                                                                                onClick={(evt) => {
                                                                                    evt.preventDefault();
                                                                                    this.setState({
                                                                                        paramToChangeBalance: {
                                                                                            methodName: 'changeCoinBalance',
                                                                                            nameObject: coin.name,
                                                                                            recordId: coin.id,
                                                                                        },
                                                                                        openFormForChangeBalance: true,
                                                                                    });
                                                                                }}>Изменить</Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </Col>
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
                                        <Col sm={12}>
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
                                                            <td className="text-center">{drink.price}</td>
                                                            <td className="text-center">
                                                                <Col sm={12}>
                                                                    <Row>
                                                                        <Col sm={4}>
                                                                            {drink.balance}
                                                                        </Col>
                                                                        <Col sm={8}>
                                                                            <Button color="primary" style={{ margin: 2 }}
                                                                                onClick={(evt) => {
                                                                                    evt.preventDefault();
                                                                                    this.setState({
                                                                                        paramToChangeBalance: {
                                                                                            methodName: 'changeDrinkBalance',
                                                                                            nameObject: drink.name,
                                                                                            recordId: drink.id,
                                                                                        },
                                                                                        openFormForChangeBalance: true,
                                                                                    });
                                                                                }}>Изменить</Button>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </td>
                                                            <td className="text-right" style={{ margin: 2 }}>
                                                                <div>
                                                                    <Button color="primary" style={{ margin: 2 }}
                                                                        onClick={(evt) => {
                                                                            evt.preventDefault();
                                                                            this.setState({ createDrink: true, selectedDrink: drink.id });
                                                                        }}>Редактировать</Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </TabPane>
                        </TabContent>
                    </div>
                    <div>
                        <Modal isOpen={this.state.openFormForChangeBalance}>
                            <ModalHeader>Изменить баланс записи: {this.state.paramToChangeBalance.nameObject}.</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <InputGroup>
                                            <Input style={{ margin: 2 }}
                                                name="amountToChangeBalance"
                                                id="amountToChangeBalance"
                                                placeholder="Укажите количество..."
                                                autocomplete="off"
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button color="danger" style={{ margin: 2 }}
                                                    onClick={(evt) => {
                                                        evt.preventDefault();
                                                        this.handlerBalanceChange(document.getElementById("amountToChangeBalance").value, true);
                                                    }}>уменьшить</Button>
                                                <Button color="success" style={{ margin: 2 }}
                                                    onClick={(evt) => {
                                                        evt.preventDefault();
                                                        this.handlerBalanceChange(document.getElementById("amountToChangeBalance").value, false);
                                                    }}>увеличить</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    onClick={(evt) => {
                                        evt.preventDefault();
                                        this.setState({
                                            paramToChangeBalance: {
                                                methodName: '',
                                                nameObject: '',
                                                recordId: 0,
                                            },
                                            openFormForChangeBalance: false,
                                        });
                                    }}>
                                    Закрыть
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </Col>
            );
        }
    }

    async checkauthorization() {
        const response = await fetch('administration/authorizationCompleted', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.match.params['key'])
        });
        const result = await response.json();

        this.setState({
            authorizationCompleted: result
        });

        if (result === true) {
            this.populateListOfCoins();
            this.populateListOfDrinks();
        }
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
                  + '&locked=' + encodeURIComponent(locked);

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

    async handlerBalanceChange(amount, isDecrease) {
        await this.changeBalance(amount, isDecrease);

        if (this.state.paramToChangeBalance.methodName === 'changeCoinBalance') {
            console.log('update listOfCoins');
            this.populateListOfCoins();
        }
        else {
            console.log('update listOfDrinks');
            this.populateListOfDrinks();
        }
 
        this.setState({
            paramToChangeBalance: {
                methodName: '',
                nameObject: '',
                recordId: 0,
            },
            openFormForChangeBalance: false,
        });
   }

    async changeBalance(amount, isDecrease) {
        let query = 'administration/' + this.state.paramToChangeBalance.methodName;

        let recordId = this.state.paramToChangeBalance.recordId;
        let coefficientAmount = (isDecrease ? -1 : 1);

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

        console.log({ 'changeBalance': result });
    }
}
