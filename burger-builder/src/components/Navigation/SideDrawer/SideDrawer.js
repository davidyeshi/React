import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    
    // conditionally set open and close classes

    return (
        <div className={classes.SideDrawer}>
            <Logo/>
            <nav>
                <NavigationItems />
            </nav>            
        </div>
    );

}

export default sideDrawer;