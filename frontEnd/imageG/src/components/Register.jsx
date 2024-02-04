import React from "react";
import { useNavigate } from "react-router-dom";
import useFormHook from "../Hooks/useFormHook";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const { form, inputHandler } = useFormHook()
  const navigate = useNavigate()

  const sumbitHandler = async () => {

    try {
        let Obj = {
            headers: {
                authorization: `Bearer ${2}`
            }
        }
        const res = await axios.post('http://localhost:3004/register', form);
        if (res.status === 201) {
            toast.success(res?.data?.message);
            navigate('/login')
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
            <label className="m-3" htmlFor="firstName">
                First Name
                <input type="text" id="firstName" name="firstName" className="form-control" value={form?.firstName} required onChange={e => inputHandler(e)} />
            </label>
        </div>
        <div className="col-12 text-center" >
            <label className="m-3" htmlFor="lastName">
                Last Name
                <input type="text" id="lastName" name="lastName" className="form-control" value={form?.lastName} required onChange={e => inputHandler(e)} />
            </label>
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
            <button className="btn btn-dark" onClick={sumbitHandler}>Register</button>
        </div>
    </div>
</div>
    <ToastContainer />
  </>
};

export default Register;
