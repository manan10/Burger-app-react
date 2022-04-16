import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import axios from '../../axios-orders'
import * as actions from './../../store/actions/index'

class BurgerBuilder extends Component{
    state = {
        loading: false,
    }

    componentDidMount() {
        this.props.onInitIngridients()
    }

    updatePurchaseState(){
        const sum = Object.keys(this.props.ings)
        .map(mykey => {
            return this.props.ings[mykey]
        })  
        .reduce((sum,el)=>{
            return sum + el;
        },0)  
        
        return sum > 0
    }

    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({
                purchasing: true,
            })
        }
        else{
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('./auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        })
    }

    purchaseContinueHandler = () =>{
        this.props.history.push('./checkout')
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;        
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Something's not working </p> : (<Spinner />);

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingridients={this.props.ings} />
                    <BuildControls 
                        ingridientAdded={this.props.onIngridientAdded}
                        ingridientRemoved={this.props.onIngridientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth} />    
                </Aux>
            )
            orderSummary = <OrderSummary 
                                ingridients={this.props.ings}
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.props.price}/>;
        }

        
        if(this.state.loading === true)
            orderSummary = <Spinner />                       
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burger.ingridients,
        price: state.burger.totalprice,
        error: state.burger.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onIngridientAdded: (ingName) => dispatch(actions.addIngrideient(ingName)),
        onIngridientRemoved: (ingName) => dispatch(actions.removeIngrideient(ingName)),
        onInitIngridients: () => dispatch(actions.initIngridients()),
        onSetRedirectPath: (path) => dispatch(actions.setRedirectPath(path))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));