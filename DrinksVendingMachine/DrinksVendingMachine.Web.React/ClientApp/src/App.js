import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AdministrationPage } from './components/AdministrationPage';
import { DrinkPage } from './components/DrinkPage';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/admin-page' component={AdministrationPage} />
            <Route exact path='/drink-page' component={DrinkPage} />
        </Layout>
    );
  }
}
