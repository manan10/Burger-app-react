import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import Aux from '../../hoc/Aux'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Checkout extends Component {
    
    componentDidMount () {
        this.props.onInitPurchase()
    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push(this.props.match.url + '/contact-data');
    }

    render() {
        let checkoutSummary = <Redirect to="/" />
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            checkoutSummary = (
                <Aux>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingridients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.url + '/contact-data'} 
                        component={ContactData}                      
                    />
                </Aux>
            )
        }        
        return (
            <div>
                {checkoutSummary}
            </div>  
        )
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burger.ingridients,
        purchased: state.order.purchased
    }
}

const mapDispatchtoProps = dispatch => {
    return { 
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Checkout)

