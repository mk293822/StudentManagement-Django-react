import { Context } from '../Context';
import getCSRFToken from "../csrfToken";
import { useContext, useEffect } from 'react';
import axios from 'axios';

function EventBackend() {

    const {
        title,
        setIsLoading,
        setError,
        setEventApiData,
        postEventData,
        setPostEventData,
        setIsEventAdd,
        deleteEvent,
        setDeleteEvent
    } = useContext(Context);

    const Api = 'http://127.0.0.1:8000/Event/';
    const csrf_token = getCSRFToken();


    useEffect(() => {
        setIsLoading(true);
        axios.get(Api)
            .then(response => {
                setEventApiData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError({ error: true, data: error });
                setIsLoading(false);
            });
    }, [title, postEventData.post, deleteEvent.delete]);

    const Post = async () => {
        if (postEventData.post) {
            try {
                const response = await fetch(Api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(postEventData.data),
                });
                setPostEventData({ post: false, data: {} });
                setIsEventAdd(false);
                // Reset after successful post
                console.log(response);
            } catch (error) {
                console.error("Error posting data:", error);
                alert(error);
            }
        }
    };

    // Trigger the Post function when postApiData changes
    useEffect(() => {
        Post();
    }, [postEventData.post]);


    const Delete = async () => {
        if (deleteEvent.delete) {
            try {
                const response = await fetch(Api, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(deleteEvent.data),
                });
                setDeleteEvent({ delete: false, data: {} });
                console.log(response);
            } catch (error) {
                console.error("Error posting data:", error);
                alert(error);
            }
        }
    };

    useEffect(() => {
        Delete();
    }, [deleteEvent.delete]);

}

export default EventBackend;