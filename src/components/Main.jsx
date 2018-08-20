import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Template from './Template'
const Main = () => (
  
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/messages' component={Template}/>
    </Switch>
)

export default Main
