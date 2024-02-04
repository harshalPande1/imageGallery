import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const Delete = ({id , setRefresh}) => {

    const deleteHandler = async() =>{
        let token = JSON.parse(localStorage.getItem('token'));
        try {
            let Obj = {
                headers: {
                    authorization: `Bearer ${token?.token}`
                }
            }
            const res = await axios.delete(`http://localhost:3004/deleteFile?id=${id}`, Obj);
            if (res.status === 201) {
                toast.success(res?.data?.message);
                setRefresh(res?.data?.Data?.length)
            } else {
                throw new Error(res)
            }
        } catch (error) {
            toast.error(error?.response?.data)
        }
    }

  return <p onClick={deleteHandler}>Delete</p>
};

export default Delete;
