import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from "react-redux";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import {updateObject, checkValidity} from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Your Street Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipcode: {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Your Zipcode'
                },
                value: '',
                validation:{
                    required: true,
                    length: 6,
                    isNumeric: true
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType : 'input',
                elementConfig : {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType : 'input',
                elementConfig : {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType : 'select',
                elementConfig : {
                    options: [
                        {value: 'fastest', display:'Fastest'},
                        {value: 'cheapest', display:'Cheapest'},
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true,
            }            
        },
        loading:false,
        formIsValid: false, 
    }

    inputChangeHandler = (event,inputId) => {
        const newElementData = updateObject(this.state.orderForm[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
            touched: true 
        }) 

        const newFormData = updateObject(this.state.orderForm, {
            [inputId]: newElementData
        })

        let formValid = true 

        for(let input in newFormData){
            formValid = newFormData[input].valid && formValid  
        }

        this.setState({
            orderForm: newFormData,
            formIsValid: formValid
        })
    }   

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {}
        for(let formElement in this.state.orderForm){
            formData[formElement] = this.state.orderForm[formElement].value
        }
        
        const order = {
            ingridients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        
        this.props.onOrderBurger(order, this.props.token)
    }
    
    render() {
        const elementArray = []
        for(let key in this.state.orderForm){
            elementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {elementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
                ))}
                <Button 
                    btnType="Success"
                    disabled={!this.state.formIsValid}>
                        Order
                </Button>    
            </form>
        )

        if(this.props.loading)
            form = <Spinner />
        return (
            <div className={classes.ContactData}>
                <h4>Contact Data Form</h4>
                {form}
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.burger.ingridients,
        price: state.burger.totalprice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchtoProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(ContactData,axios))
