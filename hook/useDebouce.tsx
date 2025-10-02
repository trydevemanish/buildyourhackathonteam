import { useEffect, useState } from "react";

export default function useDebounce<T>(textField:T,delay=500){
    const [debounceValue,setDebounceValue] = useState<T>()

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(textField)
        }, delay);

        return () => clearInterval(timeout)
    },[textField,delay])

    return debounceValue;
}