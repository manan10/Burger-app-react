import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgurBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout'
import Checkout from './containers/Checkout/Checkout'
import { Route,Switch,withRouter,Redirect } from 'react-router-dom'
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import { connect } from 'react-redux'
import * as actions from './store/actions/index' 

class App extends Component{
  componentDidMount () {
    this.props.onTryAutoSignIn()
  }

  render(){

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} /> 
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuth)
     routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders"  component={Orders}/>
        <Route path="/auth" component={Auth} /> 
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
     )
    return (
      <div>
        <Layout>
          {routes}     
        </Layout>
      </div>
    );
  }  
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  } 
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  } 
}

export default withRouter(connect(mapStateToProps ,mapDispatchToProps)(App))
