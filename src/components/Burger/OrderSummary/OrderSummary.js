import React,{Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    render() {

        const ingredients = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>;
        });

        return (
            <Auxiliary> 
                <h3>Your Order</h3>
                <p>Your delicious order has following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxiliary>
        );
    }
}

export default OrderSummary;