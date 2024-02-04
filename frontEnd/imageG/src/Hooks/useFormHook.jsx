import { useState } from "react";


const useFormHook = () => {
    const [form, setForm] = useState({})

    const inputHandler = (e) => {
        setForm(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    }
    return { form,  inputHandler }
};

export default useFormHook;
