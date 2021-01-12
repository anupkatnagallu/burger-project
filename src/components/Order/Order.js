import classes from './Order.module.css';

const order = props => {
    let ingredients = [];

    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            value: props.ingredients[ingName]
        });
    }

    let ing = ingredients.map(ig => {
        return (
            <span key={ig.name} style={{
                textTransform: 'capitalize',
                border: '1px solid #ccc',
                margin: '0 5px',
                padding: '5px'
            }}>
                {ig.name} ({ig.value})
            </span>
        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ing}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;