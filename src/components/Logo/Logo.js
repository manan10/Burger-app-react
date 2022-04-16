import React from 'react'
import burgerLogo from '../../assests/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="BurgerApp Logo"></img>
        </div>
    )
}

export default Logo
