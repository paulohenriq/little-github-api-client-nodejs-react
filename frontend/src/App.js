import React, { Component } from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import List from './pages/Users/List'
import Details from './pages/Users/Details'

class App extends Component {  
  componentDidUpdate(){    
    this.setState({ loading: false })    
  }

  render() {    
      return (           
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={List} />
            <Route path="/users/page/:page" component={List} />
            <Route path="/user/:username/details" component={Details} />
          </Switch>
        </BrowserRouter>      
      )
  }
}

export default App