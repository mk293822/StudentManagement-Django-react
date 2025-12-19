import { Context } from "../Context";
import getCSRFToken from "../csrfToken";
import { useContext, useEffect } from "react";
import axios from "axios";

function TeacherInfoBackend() {
  const {
    title,
    postTeacherApiData,
    setPostTeacherApiData,
    isTeacherEdit,
    setIsTeacherEdit,
    setIsTeacherAdd,
    setGetTeacherApiData,
    deleteTeacher,
    setDeleteTeacher,
    updateTeacher,
    setUpdateTeacher,
    setIsLoading,
    setError,
    searchItem,
    setIsTeacherTable,
  } = useContext(Context);

  const Api = "http://127.0.0.1:8000/TeacherInfo/";
  const csrf_token = getCSRFToken();

  // Get items on mount
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(Api)
      .then((response) => {
        // console.log(response.data);
        function searchItemCheck() {
          if (isNaN(searchItem)) {
            const isName = response.data.filter((data) =>
              data.name.toLowerCase().includes(searchItem.toLowerCase())
            );
            const isSubject = response.data.filter((data) =>
              data.main_subject.toLowerCase().includes(searchItem.toLowerCase())
            );

            return searchItem
              ? isName.length > 0
                ? isName
                : isSubject.length > 0
                ? isSubject
                : []
              : response.data;
          } else {
            const changeNum = Number(searchItem);
            return searchItem
              ? response.data.filter((data) => data.grade == changeNum)
              : response.data;
          }
        }

        if (title === "Teachers") {
          const filteredData = searchItemCheck();
          setGetTeacherApiData(filteredData);
        } else {
          setGetTeacherApiData(response.data);
        }

        setIsLoading(false);
        setIsTeacherTable(true);
      })
      .catch((error) => {
        setError({ error: true, data: error });
        setIsLoading(false);
      });
  }, [
    title,
    postTeacherApiData.post,
    updateTeacher.update,
    deleteTeacher.delete,
    searchItem,
  ]);

  const Post = async () => {
    if (postTeacherApiData.post) {
      console.log("Posting data:", postTeacherApiData.data);
      try {
        const response = await fetch(Api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_token,
          },
          body: JSON.stringify(postTeacherApiData.data),
        });
        setPostTeacherApiData({ post: false, data: {} });
        setIsTeacherAdd(false);
        setIsTeacherTable(true);
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
  }, [postTeacherApiData.post]);

  const Update = async () => {
    if (updateTeacher.update) {
      try {
        const response = await fetch(Api, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_token,
          },
          body: JSON.stringify(updateTeacher.data),
        });
        setUpdateTeacher({ update: false, data: {} });
        setIsTeacherEdit({ edit: false, data: {} }); // Reset after successful post
        setIsTeacherTable(true);
        console.log(response);
      } catch (error) {
        console.error("Error posting data:", error);
        alert(error);
      }
    }
  };

  // Trigger the Post function when postApiData changes
  useEffect(() => {
    Update();
  }, [updateTeacher.update, isTeacherEdit.edit]);

  const Delete = async () => {
    if (deleteTeacher.delete) {
      try {
        const response = await fetch(Api, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_token,
          },
          body: JSON.stringify(deleteTeacher.data),
        });
        setDeleteTeacher({ delete: false, data: {} });
        setIsTeacherTable(true);
        console.log(response);
      } catch (error) {
        console.error("Error posting data:", error);
        alert(error);
      }
    }
  };

  useEffect(() => {
    Delete();
  }, [deleteTeacher.delete]);
}

export default TeacherInfoBackend;
