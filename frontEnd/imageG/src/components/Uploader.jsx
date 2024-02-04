import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Uploader = ({setData,setRefresh}) => {
    const [file, setFile] = useState();

    const uploadHandler = async() => {
        const formData = new FormData();
        formData.append("file", file)
        formData.append("name", "file")
        let token = JSON.parse(localStorage.getItem('token'));
        try {
            let Obj = {
                headers: {
                    authorization: `Bearer ${token?.token}`
                }
            }
            const res = await axios.post('http://localhost:3004/upload',formData , Obj);
            if (res.status === 201) {
                toast.success(res?.data?.message);
                setData(res?.data?.Data)
                setRefresh(res?.data?.Data?.length)
            } else {
                throw new Error(res)
            }
        } catch (error) {
            toast.error(error?.response?.data)
        }
    }

    return <>
        <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn btn-info" onClick={uploadHandler}>Upload</button>
    </>

};

export default Uploader;
