import React from 'react'
import classes from './Order.module.css'

const Order = (props) => {
    const ingridients = [];

    for(let ingridient in props.ingridients){
        ingridients.push({name: ingridient, amount: props.ingridients[ingridient]})         
    }

    const ingridientOutput = ingridients.map(mykey => {
        return <span key={mykey.name} 
                    style={{textTransform: 'capitalize',
                            display: 'inline-block',
                            margin: '0 8px',
                            border: '1px solid #ccc',
                            padding: '5px'
                          }}>
                        {mykey.name} ({mykey.amount})
                </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingridients : {ingridientOutput}</p>
            <p>Price: <strong> {props.price.toFixed(2)} USD </strong></p>
        </div>
    )
}

export default Order
