import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey} :</span> {props.ingredients[igKey]}</li>
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Price: { props.price.toFixed(2) }</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Buy</Button>
        </Aux>
    )
}

export default orderSummary;