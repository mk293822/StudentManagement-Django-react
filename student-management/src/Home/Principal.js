import { Context } from '../Context';
import getCSRFToken from "../csrfToken";
import { useContext, useEffect } from 'react';
import axios from 'axios';


function PrincipalBackend() {

    const {
        title,
        setIsLoading,
        setError,
        setPrincipalApiData
    } = useContext(Context);

    const Api = 'http://127.0.0.1:8000/Principal/';
    const csrf_token = getCSRFToken();


    useEffect(() => {
        setIsLoading(true);
        axios.get(Api)
            .then(response => {
                setPrincipalApiData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError({ error: true, data: error });
                setIsLoading(false);
            });
    }, [title]);

}


export default PrincipalBackend;