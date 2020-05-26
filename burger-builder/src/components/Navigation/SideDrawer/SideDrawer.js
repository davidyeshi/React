import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    
    // conditionally set open and close classes
    let attachedClass = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClass = [classes.SideDrawer, classes.Open];
    }

    return (
        <>
        <Backdrop show = {props.show} clicked={props.closed}/>
        <div className={attachedClass.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems />
            </nav>            
        </div>
        </>
    );

}

export default sideDrawer;