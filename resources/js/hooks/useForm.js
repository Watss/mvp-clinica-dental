import {useState} from 'react';

export const useForm = (initState) => {
    
    const [dataForm, setForm] = useState(initState);
    
    const handleChangeForm = event => {
        const {name,value} = event.target;

        setForm({ ...dataForm, [name] : value });
    }
    
    return {dataForm,handleChangeForm,setForm};
}