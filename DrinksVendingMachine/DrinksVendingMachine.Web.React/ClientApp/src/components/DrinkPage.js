import React, { Component, useState } from 'react';
import {
    Button, Form, FormGroup, Label, Input, Row, Col, FormText, Card, CardImg
} from 'reactstrap';

export class DrinkPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinkId: this.props.drinkId,
            drinkName: "",
            description: "",
            price: 0,
            image: null,
            imageInBase64: '',
            imageChanged: false,
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

    onImageChange(evt) {
        if (evt.target.files && evt.target.files[0]) {
            const fileImage = evt.target.files[0];

            this.setState({
                image: URL.createObjectURL(fileImage),
                imageChanged: true,
            });
        }
    }

    render() {
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
                                    accept=".png"
                                    onChange={(evt) => { this.onImageChange(evt) }}
                                />
                                <FormText>
                                    Необходимо выбрать файл с расширением PNG.
                                </FormText>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            {(!(this.state.image == null) || !(this.state.imageInBase64 === null))
                                && (<img
                                        alt="image of drink"
                                        id="imageOfDrink"
                                        src={this.state.imageChanged ? this.state.image : 'data:image/png;base64,' + this.state.imageInBase64}
                                        width="100%"
                                />)}
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
            imageInBase64: data.image,
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
                id: this.state.drinkId,
                name: this.state.drinkName,
                description: this.state.description,
                price: this.state.price,
                imageInBase64: this.state.imageChanged ? this.getImageAsBase64String() : this.state.imageInBase64,
            })
        });
        const data = await response.json();
        this.setState({ savedDrink: data });

        this.props.saveDrink();
    }

    getImageAsBase64String() {
        var canvas = document.createElement('canvas');
        var objImage = document.getElementById('imageOfDrink');

        canvas.height = objImage.height;
        canvas.width = objImage.width;
        var context = canvas.getContext('2d');

        context.drawImage(objImage, 0, 0);
        var base64String = canvas.toDataURL();

        return base64String;
    }
}
