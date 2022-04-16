import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
         
            { props.isAuth ? <NavigationItem link="/orders">My Orders</NavigationItem> : null }
         
            {   !props.isAuth ? 
                <NavigationItem link="/auth">Sign-In</NavigationItem> : 
                <NavigationItem link="/logout">Logout</NavigationItem>
            }
        </ul>
    )
}

export default NavigationItems
