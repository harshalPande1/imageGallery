import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Delete from "./Delete";
import Download from "./Download";

const Table = ({ data, setData, refresh , setRefresh }) => {

    const getData = async () => {
        let token = JSON.parse(localStorage.getItem('token'));
        try {
            let Obj = {
                headers: {
                    authorization: `Bearer ${token?.token}`
                }
            }
            const res = await axios.get('http://localhost:3004/userFiles', Obj);
            if (res.status === 201) {
                toast.success(res?.data?.message);
                setData(res?.data?.Data)
            } else {
                throw new Error(res)
            }
        } catch (error) {
            toast.error(error?.response?.data)
        }
    }

    useEffect(() => {
        getData();
    }, [refresh]);

    return <>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Image Name</th>
                    <th scope="col">Upload Date</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Download</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item) => {

                    return <tr key={item?._id}>
                        <td>{item?.fileName}</td>
                        <td>{item?.createdAt}</td>
                        <td className="text-danger"><Delete id={item?._id} setRefresh={setRefresh} /></td>
                        <td className="text-danger"><Download id={item?._id}  /></td>
                    </tr>
                })
                }
            </tbody>
        </table>
    </>
};

export default Table;
