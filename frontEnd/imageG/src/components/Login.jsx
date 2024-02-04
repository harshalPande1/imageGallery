import React, { useEffect } from "react";
import useFormHook from "../Hooks/useFormHook";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {  Route, useNavigate } from "react-router-dom";

const Login = () => {
    const { form, inputHandler } = useFormHook()
    const navigate = useNavigate()
    // useEffect(()=>{
    //    if(JSON.parse(localStorage.getItem('token') ).token ){
    //     // console.log("token have");
    //     navigate("/register")
        
    //    } 
    // },[JSON.parse(localStorage.getItem('token') ).token ])

    const sumbitHandler = async () => {
        try {
            let Obj = {
                headers: {
                    authorization: `Bearer ${2}`
                }
            }
            const res = await axios.post('http://localhost:3004/login', form);
            if (res.status === 201) {
                toast.success(res?.data?.message);
                localStorage.setItem("token",JSON.stringify(res?.data?.auth))
                navigate('/register')
            } else {
                throw new Error(res)
            }
        } catch (error) {
            toast.error(error?.response?.data)
        }
    }
    return <>

    <div className="container d-flex justify-content-center border shadow col-3 mt-5">
        <div className="row gap-2 p-3">
            <div className="text-center">
                <h3>Image Gallery</h3>
            </div>
            <div className="col-12 text-center" >
                <label className="m-3" htmlFor="emailId">
                    Email-Id
                    <input type="email" id="emailId" name="emailId" className="form-control" value={form?.emailId} required onChange={e => inputHandler(e)} />
                </label>
            </div>
            <div className="col-12 text-center" >
                <label className="m-3" htmlFor="password">
                    Password
                    <input type="password" id="password" name="password" className="form-control" value={form?.password} required onChange={e => inputHandler(e)} />
                </label>
            </div>
            <div className="col-12 text-center" >
                <button className="btn btn-dark" onClick={sumbitHandler}>Login</button>
            </div>
        </div>
    </div>
        <ToastContainer />
    </> 
};

export default Login;
