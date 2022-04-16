import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.module.css'
import Logo from '../../components/Logo/Logo'
import Aux from '../../hoc/Aux'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {updateObject, checkValidity} from '../../shared/utility'

export class Auth extends Component {
    state = {
        isSignup: true,
        controls: {
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
            password: {
                elementType : 'input',
                elementConfig : {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 7,
                },
                valid: false,
                touched: false,
            }
        }
    }

    componentDidMount () {
        if(!this.props.buildingBurger && this.props.redirectPath !== '/'){
            this.props.onSetRedirectPath()
        }   
    }

    inputChangeHandler = (event,controlName) => {
        const updatedControls = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })    

        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchModeHandler = () => {

        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const elementArray = []
        for(let key in this.state.controls){
            elementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = elementArray.map(element => (
            <Input 
                key={element.id}
                elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} 
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.inputChangeHandler(event,element.id)}
            />
        ))

        if(this.props.loading)
            form = <Spinner /> 

        let errorMessage = null    
        if(this.props.error)
            errorMessage = (
                <p>{this.props.error.message}</p>
            )

        let redirect = null
        if(this.props.isAuth)
            redirect = <Redirect to={this.props.redirectPath} />

        return (
            <Aux>
                {redirect}
                <div className={classes.Logo1}>
                    <Logo />
                </div>
                <div className={classes.Auth}>
                    <h1>{this.state.isSignup ? 'User Sign-Up' : 'User Sign-In'}</h1>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}> 
                        {form}  
                        <Button btnType="Success">Submit</Button>    
                    </form>
                    <p>{this.state.isSignup ? 'Already a user?' : 'New User?'}</p>
                    <Button
                        clicked={this.switchModeHandler} 
                        btnType="Danger">
                            {this.state.isSignup ? 'Sign-In' : 'Sign-Up'}
                    </Button>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burger.building,    
        redirectPath: state.auth.redirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, pwd, isSignup) => dispatch(actions.auth(email, pwd, isSignup )),
        onSetRedirectPath: () => dispatch(actions.setRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth)
