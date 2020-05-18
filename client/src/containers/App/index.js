import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react'

import Counter from './../Counter';

import AllTodosList from '../AllTodosList';
import UserTodoList from '../UserTodoList';

import SignUp from '../SignUp';
import SignIn from '../SignIn';
import SignOut from '../SignOut';

import Navbar from './../../components/Navbar';


class App extends Component {
  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 700 }}>
          <Navbar authenticated={this.props.authenticated}/>
          <Route exact path='/' component={SignUp}/>

          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/signout' component={SignOut}/>
          <Route exact path='/alltodos' component={AllTodosList}/>
          <Route exact path='/usertodos' component={UserTodoList}/>
          <Route exact path='/counter' component={Counter}/>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(App);
