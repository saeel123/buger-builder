import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummarry/OrderSumarry';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';




class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        this.props.onInitIngredient();
    }



    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map( igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = ()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }



    render () {

        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Unable to load ingredients</p> : <Spinner/>

        if (this.props.ings) {
            orderSummary = <OrderSummary 
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            price={this.props.price}
                            ingredients={this.props.ings}/>

            burger = <Aux>
                        <Burger ingredients={this.props.ings}/>
                         <BuildControls 
                            ingredientsAdded = {this.props.onIngredientAdded}
                            ingredientsRemoved = {this.props.onIngredientRemove}
                            price = {this.props.price}
                            disabled = {disabledInfo}
                            purchasable = {this.updatePurchaseState(this.props.ings)}
                            isAuth={this.props.isAuthenticated}
                            ordered = {this.purchaseHandler}
                        />
                    </Aux> 
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));