import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisible(false);
    }

    const drawerToggleClickedHandler = () => {
        setSideDrawerVisible(!sideDrawerVisible);
    }
        return (
            <Auxiliary>
                <Toolbar isAuth={props.isAuth} drawerToggleClicked={drawerToggleClickedHandler} />
                <SideDrawer isAuth={props.isAuth} open={sideDrawerVisible} closed={sideDrawerClosedHandler}/> 
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Auxiliary>
        );
}

const mapStateToProps = state => {
    return {
        isAuth: state.ar.token !== null
    }
}

export default connect(mapStateToProps)(Layout);