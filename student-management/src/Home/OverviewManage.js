import { useContext, useEffect } from "react";
import { Context } from "../Context";
import getCSRFToken from "../csrfToken";
import axios from "axios";


function OverviewBackend() {
    const csrf_token = getCSRFToken()
    const { title, setIsLoading, setError, setOverviewApiData } = useContext(Context)
    const Api = 'http://127.0.0.1:8000/OverView/'

    useEffect(() => {
        setIsLoading(true);
        axios.get(Api)
            .then(response => {
                console.log(response.data)
                setOverviewApiData(response.data)
                setIsLoading(false);
            }).catch(error => {
                console.error(error);
                setIsLoading(false);
                setError({ error: true, data: error });
            })

    }, [title])


}

export default OverviewBackend;