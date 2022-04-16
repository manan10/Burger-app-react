import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button' 

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingridients)
        .map(mykey => {
            return (
                <li key={mykey}> 
                    <span style={{textTransform:"capitalize"}}>{mykey}</span>: {props.ingridients[mykey]}
                </li>
            )        
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p> A Delicious burger with the following ingredients </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}$</strong></p>
            <p> Continue to CheckOut?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default OrderSummary
