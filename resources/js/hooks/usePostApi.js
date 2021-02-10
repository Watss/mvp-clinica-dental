import { useState } from "react"
import {axiosInstance} from '../utils/axios';

export const usePostApi = () => {

    const [loader,setLoader] = useState(false);
    const [response,setResponse] = useState([]);
    const [status,setStatus] = useState(false);
    const [errors,setErrors] = useState([]);

    const postData = async (endPoint,data) => {
        let success = false
        setLoader(true);
        
        try {
            const res = await axiosInstance.post(endPoint,data);
            
            success = res.data.success;
            setStatus(success);

        } catch (error) {
            success = false
            setStatus(false);
            const {errors} = error.response.data;
            setErrors(errors);
        }finally{
            setLoader(false);
        }
        return success;
    }
    
    return { 
        response,
        loader,
        errors,
        postData,
        status,
    };
}

