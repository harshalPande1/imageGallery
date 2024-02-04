import React from "react";
import { createPortal } from "react-dom";
const Modal = ({ setShowModal, setBody, downloadHandler }) => {

    const bodyHandler = (e) => {
        setBody(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const modal = <div className="position-absolute top-50 start-50 shadow">
        <div className="position-relative m-3">
            <label htmlFor="downloadCode" className="">Enter Code</label>
            <input type="text" className="form-control my-2 " name="downloadCode" onChange={(e) => bodyHandler(e)} />

            <div className="d-flex ">
                <button className="btn btn-danger mx-2" onClick={() => setShowModal(false)}>close</button>
                <button className="btn btn-success mx-2" onClick={downloadHandler} >download</button>
            </div>
        </div>
    </div>;
    return createPortal(modal, document.getElementById("modal"))
};

export default Modal;
