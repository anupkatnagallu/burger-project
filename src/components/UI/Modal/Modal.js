import React from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {

    return (
        <Auxiliary>
            <Backdrop purchasing={props.purchasing} clicked={props.modalClosed} />
            <div className={classes.Modal} style={{
                transform: props.purchasing ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.purchasing ? '1' : '0'
            }}>
                {props.children}
            </div>
        </Auxiliary>
    );
}

export default React.memo(Modal, (prevProps, nextProps) => {
    return nextProps.purchasing === prevProps.purchasing && nextProps.children === prevProps.children;
});