'use client'

import { useEffect, useState, useRef } from "react"
import { FetchData } from '@/utils/fetchData'

type props = {
    url:string;
    // states that effect the rerender 
    state?:any
}

export function useFetchData<T>({url,state}:props){
    const [data, setData] = useState<T>()    
    const isFetchedOnce = useRef(false)
    const [errors,setErrors] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {

        const getData = async() => {
            try {

                if(isFetchedOnce.current) return false;
                isFetchedOnce.current = true;

                setLoading(true)

                if(!url || url.trim() == ""){
                    console.log('Url Not provided!')
                    return
                }


                const { data: fetchedData,error:fetchedErrors } = await FetchData(url)
                setData(fetchedData?.data)
                setErrors(fetchedErrors)
                
            } catch (error:any) {

                console.log(`An unknown Error Occured fetching data: ${error}`)
                setErrors(error)
        
            } finally { 
                setLoading(false)
            }
        }

        if(url && navigator.onLine){
            getData()
        } else {
            console.log('Network Issue!')
        }

    },[url,...(state || [])])

    return { data,errors,loading }
}