import { useState, useEffect } from 'react';

const HttpErrorHandler = httpClient => {
    const [error, setError] = useState(null);

        const reqInterceptor = httpClient.interceptors.request.use(req => {
            setError(null);
            return req;
        }, err => err);

        const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
            setError(err);
            return Promise.reject(err);
        });

        useEffect(() => {
            return () => {
                httpClient.interceptors.request.eject(reqInterceptor);
                httpClient.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor, httpClient.interceptors.request, httpClient.interceptors.response]);

        const errorHandler = () => {
            setError(null);
        }

        return [error, errorHandler];
}

export default HttpErrorHandler;