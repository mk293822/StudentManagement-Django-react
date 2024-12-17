import { Context } from '../Context';
import getCSRFToken from "../csrfToken";
import { useContext, useEffect } from 'react';
import axios from 'axios';


function ClassListBackend() {

    const { setIsLoading,
        setError,
        setGetClassApiData,
        deleteClass,
        setDeleteClass,
        postClassApiData,
        setPostClassApiData,
        title,
        searchItem
    } = useContext(Context);

    const Api = 'http://127.0.0.1:8000/ClassList/';
    const csrf_token = getCSRFToken();

    useEffect(() => {
        setIsLoading(true);
        axios.get(Api)
            .then(response => {
                // console.log(response.data)
                function searchItemCheck() {
                    if (isNaN(searchItem)) {
                        const isClassName = response.data.filter(data => data.name.toLowerCase().includes(searchItem.toLowerCase()));
                        const isTeacherName = response.data.filter(data => data.classTeacherName.toLowerCase().includes(searchItem.toLowerCase()));

                        return searchItem ? isClassName.length > 0 ? isClassName : isTeacherName.length > 0 ? isTeacherName : [] : response.data;

                    } else {
                        const changeNum = Number(searchItem);
                        return searchItem
                            ? response.data.filter(data => data.grade == changeNum)
                            : response.data;
                    }
                }

                if (title === 'Class-Table') {
                    const filteredData = searchItemCheck();
                    setGetClassApiData(filteredData);
                } else {
                    setGetClassApiData(response.data);
                }


                setIsLoading(false);
            })
            .catch(error => {
                setError({ error: true, data: error });
                setIsLoading(false);
            });
    }, [deleteClass.delete, title, postClassApiData.post, searchItem]);


    const Post = async () => {
        // console.log(postClassApiData.data)
        if (postClassApiData.post) {
            try {
                const response = await fetch(Api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(postClassApiData.data),
                });
                setPostClassApiData({ post: false, data: {} });
                // console.log(response);
            } catch (error) {
                console.error("Error posting data:", error);
                alert(error);
            }
        }
    };

    useEffect(() => {
        Post();
    }, [postClassApiData.post]);



    const Delete = async () => {
        if (deleteClass.delete) {
            try {
                const response = await fetch(Api, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf_token,
                    },
                    body: JSON.stringify(deleteClass.data),
                });
                setDeleteClass({ delete: false, data: {} });
                console.log(response);
            } catch (error) {
                console.error("Error posting data:", error);
                alert(error);
            }
        }
    };

    useEffect(() => {
        Delete();
    }, [deleteClass.delete]);

}

export default ClassListBackend;