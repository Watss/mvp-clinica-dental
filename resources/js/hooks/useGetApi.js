import { useState } from "react"
import {axiosInstance} from '../utils/axios';

export const useGetApi = (endPoint) => {

    const [loader,setLoader] = useState(false);
    const [data,setData] = useState([]);
    const [errors,setErrors] = useState([]);
    const [count, setCount] = useState(0);
    const [lastPage,setLastPage] = useState(1);

    const getData = async (filters = {},page = 0,perPage = 5) => {

        const params = getParams(filters,page,perPage);
        console.log('params',params);
        setLoader(true);
        
        try {

            const res = await axiosInstance.get(endPoint,{params:params});
            const {data,meta} = res.data;
            const {last_page,count} = meta;
            setData(data);
            setCount(count);
            setLastPage(last_page);

        } catch (error) {
            const {errors} = error;
            setErrors(errors);
        }finally{
            setLoader(false);
        }

    }

    const getParams = (filters,page,perPage) => {
        let formatFilters = {};
        
        for(const key in filters){
            const name = `filter[${key}]`;
            formatFilters = {...formatFilters, [name] : filters[key] };
        }

        return{
 
            'page[number]' : page, 
            'page[size]' : perPage,
            ...formatFilters
        };
    }
    
    return { 
        data,
        loader,
        errors,
        getData,
        count,
        lastPage 
    };
}

