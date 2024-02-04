import React, { useEffect, useState } from "react";

const useAuth = () => {
    // const [token , setToken] = useState(null);
    let  authToken = JSON.parse(localStorage.getItem('token'))
    // useEffect(()=>{
    //     // console.log("authToken",authToken?.token);
    //     if(authToken?.token !== null){
    //         setToken(authToken?.token);
    //     }
    // },[authToken])
    // console.log("useAuth",token);
  return authToken?.token
};

export default useAuth;
