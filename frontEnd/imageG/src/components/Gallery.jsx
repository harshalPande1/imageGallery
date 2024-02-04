import React, { useEffect, useState } from "react";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Uploader from "./Uploader";
import Table from "./Table";


const Gallery = () => {
    const [data, setData] = useState();
    const [refresh, setRefresh] = useState(0);



 
 




    return <>
        <Header />
        <div className="container">
            <div className="row">
            <div className="col-12 my-3">
               <Uploader  setData={setData} setRefresh={setRefresh}/>
            </div>
                <div className="col-12">
                  <Table setData={setData} refresh={refresh} data={data} setRefresh={setRefresh}  />
                </div>
            </div>
        </div>
        <ToastContainer />

    </>;
};

export default Gallery;
