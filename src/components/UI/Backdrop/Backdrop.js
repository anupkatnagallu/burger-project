import classes from './Backdrop.module.css';

const backdrop = props => (
    props.purchasing ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;