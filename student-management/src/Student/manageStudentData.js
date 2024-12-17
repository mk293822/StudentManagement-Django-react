import { Context } from '../Context';
import getCSRFToken from "../csrfToken";
import { useContext, useEffect } from 'react';
import axios from 'axios';

function StudentInfoBackend() {

    const {
        title,
        postApiData,
        setPostApiData,
        isEdit,
        setIsEdit,
        setIsAdd,
        setGetApiData,
        deleteStudent,
        setDeleteStudent,
        updateStudent,
        setUpdateStudent,
        setIsLoading,
        setError,
        searchItem,
        setIsTable
    } = useContext(Context);

    const Api = 'http://127.0.0.1:8000/StudentInfo/';
    const csrf_token = getCSRFToken();


    // Get items on mount
    useEffect(() => {
        setIsLoading(true);
        axios.get(Api)
            .then(response => {
                // Filter the data based on the search term
                if (title === 'Students') {
                    const filteredData = searchItem
                        ? response.data.filter(data => data.name.toLowerCase().includes(searchItem.toLowerCase()))
                        : response.data;

                    setGetApiData(filteredData);
                } else {
                    setGetApiData(response.data);
                }

                setIsLoading(false);
            })
            .catch(error => {
                alert(error);
                setError({ error: true, data: error });
                setIsLoading(false);
            });
    }, [title, postApiData.post, updateStudent.update, deleteStudent.delete, searchItem]);


    const Post = async () => {
        if (postApiData.post) {
            try {
                const response = await fetch(Api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(postApiData.data),
                });
                setPostApiData({ post: false, data: {} });
                setIsAdd(false);
                setIsTable(true);
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
    }, [postApiData.post]);



    const Update = async () => {
        if (updateStudent.update) {
            try {
                const response = await fetch(Api, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(updateStudent.data),
                });
                setUpdateStudent({ update: false, data: {} });
                setIsEdit({ edit: false, data: {} });// Reset after successful post
                setIsTable(true);
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
    }, [updateStudent.update, isEdit.edit]);


    const Delete = async () => {
        if (deleteStudent.delete) {
            try {
                const response = await fetch(Api, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(deleteStudent.data),
                });
                setDeleteStudent({ delete: false, data: {} });
                setIsTable(true);
                console.log(response);
            } catch (error) {
                console.error("Error posting data:", error);
                alert(error);
            }
        }
    };

    useEffect(() => {
        Delete();
    }, [deleteStudent.delete]);

}

export default StudentInfoBackend;