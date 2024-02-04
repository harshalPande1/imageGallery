
import {  Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
const Protected = () => {

    const token = useAuth()
    const location = useLocation()
        
        return    token  ?  <Outlet />  : <Navigate to='/login' state={{from : location}} replace />

};

export default Protected;
