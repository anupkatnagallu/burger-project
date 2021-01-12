import classes from './Input.module.css'

const input = props => {
    let inputElement = null;
    const inputClass = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClass.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change}/>;
            break;
        case 'textarea':
            inputElement = <textarea className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change}/>;
            break;
        case 'select':
            
            inputElement = (
                <select className={inputClass.join(' ')} value={props.value} onChange={props.change}>
                    {props.elementConfig.options.map(option => {
                        return(
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        )
                    })}
                </select>
            );
            break;
        default:
            inputElement = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.change}/>
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

}

export default input;