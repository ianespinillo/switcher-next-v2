import { useState } from "react"

export const useForm = (initialState= {}) => {
    const [Values, setValues] = useState(initialState)
    const reset = ()=>{
        setValues(initialState);
    }
    const handleInputChange = ({target}) => {
        setValues({
            ...Values,
            [target.name]: target.value
        })
    }
    const handleSelectChange = ({value}, prop)=>{
        setValues({
            ...Values,
            [prop]: value,
        })
    }
    return [Values, handleInputChange, handleSelectChange, reset, setValues];
}
