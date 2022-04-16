import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngreidients/BurgerIngredient';

const burger = (props) => {
    
    let transformedIngredients = Object.keys(props.ingridients)
    .map(mykey => {
        return [...Array(props.ingridients[mykey])]
        .map((_, i) => {
            return <BurgerIngredient key={mykey + i} type={mykey}/>;
        });    
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding Ingridients.</p>
    }

    return (    
        <div className={ classes.Burger }>
            <BurgerIngredient type="bread-top" />
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;
