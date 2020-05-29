import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {
    state = {
        showSideDrawer: true
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
                <Toolbar  drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
    


export default Layout;