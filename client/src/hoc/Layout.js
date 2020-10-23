import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from './Auxiliary';
import Toolbar from '../components/navigation/Toolbar/Toolbar';

class Layout extends Component {
    // state = {
    //     showSideDrawer: false
    // }

    // sideDrawerClosedHandler = () => {
    //     this.setState( { showSideDrawer: false } );
    // }

    // sideDrawerToggleHandler = () => {
    //     this.setState( ( prevState ) => {
    //         return { showSideDrawer: !prevState.showSideDrawer };
    //     } );
    // }

    render () {
        return (
            <Auxiliary>
                <Toolbar
                    isLogin={this.props.isLogin}
                    // drawerToggleClicked={this.sideDrawerToggleHandler} 
                    />
                {/* <SideDrawer
                    isAuth={this.props.isLogin}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} /> */}
                <main >
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.authReducer.isLogin !== null
    };
};

export default connect( mapStateToProps, null )( Layout );