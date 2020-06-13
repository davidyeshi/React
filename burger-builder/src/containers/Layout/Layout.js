import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {

        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return {showSideDrawer: !prevState.showSideDrawer}});
    }

    render() {
        return(
            <>
                <Toolbar clicked = {this.sideDrawerToggleHandler} isAuth = {this.props.isAuthenticated}/>
                <SideDrawer show = {this.state.showSideDrawer} closed={this.closeSideDrawerHandler} isAuth = {this.props.isAuthenticated}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </>
    )
}};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);