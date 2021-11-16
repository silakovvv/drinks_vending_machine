import React, { Component, useState } from 'react';
import {
    Button, Form, FormGroup, Label, Input, Row, Col, FormText
} from 'reactstrap';

export class DrinkPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinkId: this.props.drinkId,
            drinkName: "",
            description: "",
            price: 0,
            savedDrink: false,
        };
    }

    componentDidMount() {
        this.populateDrink();
    }

    changeValueField(evt) {
        const { name, value } = evt.target;
        this.setState({ [name]: value });
    }

    render () {
        return (
            <Col sm={12}>
                <Row>
                    <Col sm={6}>
                        <h1>Напиток #{this.state.drinkId}</h1>
                    </Col>
                    <Col sm={6}>
                        <div className="text-right">
                            <Button color="success"
                                style={{
                                    paddingTop: 10,
                                    paddingRight: 20,
                                    paddingBottom: 10,
                                    paddingLeft: 20,
                                    fontWeight: 700
                                }}
                                onClick={(evt) => { evt.preventDefault(); this.saveDrink(); }}>
                                Сохранить
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Form className="row" style={{ width: "100%" }}>
                        <Col sm={6}>
                            <FormGroup>
                                <Row>
                                    <Label for="drinkName" sm={12}>Название</Label>
                                    <Col sm={12}>
                                        <Input type="text" name="drinkName" id="drinkName" placeholder="Укажите название напитка"
                                            value={this.state.drinkName}
                                            onChange={(evt) => { this.changeValueField(evt) }} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Label for="description" sm={12}>Описание</Label>
                                    <Col sm={12}>
                                        <Input type="text" name="description" id="description" placeholder="Введите описание"
                                            value={this.state.description}
                                            onChange={(evt) => { this.changeValueField(evt) }} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    <Label for="price" sm={12}>Цена</Label>
                                    <Col sm={12}>
                                        <Input name="price" id="price" placeholder="Укажите Цену"
                                            value={this.state.price}
                                            onChange={(evt) => { this.changeValueField(evt) }} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageFile">Файл картинки</Label>
                                <Input
                                    id="imageFile"
                                    name="imageFile"
                                    type="file"
                                />
                                <FormText>
                                    Выберите файл картинки напитка
                                </FormText>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                        </Col>
                    </Form>
                </Row>
            </Col>
        );
    }

    async populateDrink() {
        if (this.props.drinkId === 0) {
            return;
        }

        let query = 'administration/drink?id=' + this.props.drinkId;

        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        this.setState({
            drinkName: data.name,
            description: data.description,
            price: data.price,
        });
    }

    async saveDrink(date) {
        const response = await fetch('administration/saveDrink', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                drinkId: this.state.drinkId,
                drinkName: this.state.drinkName,
                description: this.state.description,
                price: this.state.price
            })
        });
        const data = await response.json();
        this.setState({ savedDrink: data });

        this.props.saveTask();
    }
}
