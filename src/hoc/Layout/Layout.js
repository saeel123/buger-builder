import React, {Component} from 'react';
import { connect } from 'react-redux'

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = (prevState)=> {
        this.setState((prevState)=> {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return(
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}  
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}
    


export default connect(mapStateToProps)(Layout);