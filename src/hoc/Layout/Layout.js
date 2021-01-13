import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    drawerToggleClickedHandler = () => {
        this.setState(prevState =>{
            return { showSideDrawer: !prevState.showSideDrawer }
        });
        
    }
    render() {
        return (
            <Auxiliary>
                <Toolbar isAuth={this.props.isAuth} drawerToggleClicked={this.drawerToggleClickedHandler} />
                <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/> 
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.ar.token !== null
    }
}

export default connect(mapStateToProps)(Layout);