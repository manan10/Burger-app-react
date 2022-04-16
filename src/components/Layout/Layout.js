import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'


export class Layout extends Component {
    
    state = {
        showSideDrawer: true,
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false,
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuth} 
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                
                <SideDrawer
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                
                <main className={classes.content}>
                    { this.props.children }
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout)
