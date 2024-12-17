import { useContext, useEffect } from "react";
import { Context } from "../Context";
import axios from "axios";
import getCSRFToken from "../csrfToken";

function AttendanceBackend() {
    const Api = 'http://127.0.0.1:8000/Attendance/';
    const csrf_token = getCSRFToken();
    const { setAttendanceApiData, title, setError, setIsLoading, postAttendanceData, setPostAttendanceData, updateAttendanceData, setUpdateAttendanceData } = useContext(Context);


    useEffect(() => {
        setIsLoading(true);
        axios.get(Api)
            .then(response => {
                setAttendanceApiData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError({ error: true, data: error });
                setIsLoading(false);
            });
    }, [title, updateAttendanceData.update, postAttendanceData.post]);

    const Post = async () => {
        if (postAttendanceData.post) {
            try {
                const response = await fetch(Api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(postAttendanceData.data),
                });
                setPostAttendanceData({ post: false, data: {} });
                console.log(response);
            } catch (error) {
                console.error("Error posting data:", error);
                alert(error);
            }
        }
    };

    useEffect(() => {
        Post();
    }, [postAttendanceData.post]);


    const Update = async () => {
        if (updateAttendanceData.update) {
            try {
                const response = await fetch(Api, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(updateAttendanceData.data),
                });
                setAttendanceApiData({ update: false, data: {} });
                console.log(response);
                if (response.error) {
                    alert(response.error);
                }
            } catch (error) {
                console.error("Error posting data:", error);
                alert(error);
            }
        }
    };

    // Trigger the Post function when postApiData change
    useEffect(() => {
        Update();
    }, [updateAttendanceData.update]);

}

export default AttendanceBackend;