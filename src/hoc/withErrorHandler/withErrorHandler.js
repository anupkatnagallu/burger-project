import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, errorHandler] = useHttpErrorHandler(axios);

        return (
            <Auxiliary>
                <Modal purchasing={error} modalClosed={errorHandler}>{error ? error.message : null}</Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        );
    }

}

export default withErrorHandler;