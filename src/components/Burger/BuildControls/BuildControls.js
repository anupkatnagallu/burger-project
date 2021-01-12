import classes from  './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Meat', type: 'meat'},
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'}
]

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl key={control.label} label={control.label} added={() => props.ingredientAdded(control.type)}
                          removed={() => props.ingredientRemoved(control.type)}
                          disabled={props.disabledInfo[control.type]}/>       
        ))}
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.orderClick}>ORDER NOW</button>

    </div>
);

export default buildControls;