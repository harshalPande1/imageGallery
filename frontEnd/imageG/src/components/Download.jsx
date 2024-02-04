import React, { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import axios from "axios";

const Download = ({ id }) => {
    const [showModal, setShowModal] = useState(false);
    const [body, setBody] = useState({ id: id });
    const downloadHandler = async () => {
        let token = JSON.parse(localStorage.getItem('token'));
        try {
            let Obj = {
                headers: {
                    authorization: `Bearer ${token?.token}`
                }
            }
            const res = await axios.post(`http://localhost:3004/download`, body, Obj);
            
            
            const link = document.createElement('a');
            
            link.href = `data:image/png;base64,${res.data}`;
            // console.log(link)
            link.setAttribute('download','png');
            document.body.appendChild(link)
            link.click()
            link.remove()
            if (res.status === 201) {
                toast.success(res?.data?.message);
            } else {
                throw new Error(res)
            }
        } catch (error) {
            toast.error(error?.response?.data)
        }
    }
    return <> <p onClick={() => setShowModal(true)}>Link</p> {showModal && <Modal setShowModal={setShowModal} setBody={setBody} downloadHandler={downloadHandler} />}</>
};

export default Download;
