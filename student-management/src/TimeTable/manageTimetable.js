import { Context } from '../Context';
import getCSRFToken from "../csrfToken";
import { useContext, useEffect } from 'react';
import axios from 'axios';

function TimeTableBackend() {

    const {
        title,
        setGetTimeTableApiData,
        updateTimeTable,
        setUpdateTimeTable,
        setIsLoading,
        setError,
        isTimeTableEdit,
        setIsTimeTableEdit,
        timeTable
    } = useContext(Context);

    const Api = 'http://127.0.0.1:8000/TimeTable/';
    const csrf_token = getCSRFToken();


    // Get items on mount
    useEffect(() => {
        setIsLoading(true);
        axios.get(Api)
            .then(response => {
                setGetTimeTableApiData(response.data);
                setIsLoading(false);
                // console.log(response.data);
            })
            .catch(error => {
                setError({ error: true, data: error });
                setIsLoading(false);
            });
    }, [title, timeTable.table, updateTimeTable.update,]);

    const Update = async () => {
        if (updateTimeTable.update) {
            try {
                const response = await fetch(Api, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(updateTimeTable.data),
                });
                setUpdateTimeTable({ update: false, data: {} });
                setIsTimeTableEdit({ edit: true, data: {} })
                // setIsEdit({ edit: false, data: {} }); // Reset after successful post
                console.log(response);
            } catch (error) {
                console.error("Error posting data:", error);
                alert(error);
            }
        }
    };

    // Trigger the Post function when postApiData change
    useEffect(() => {
        Update();
    }, [updateTimeTable.update, isTimeTableEdit.edit]);


}

export default TimeTableBackend;