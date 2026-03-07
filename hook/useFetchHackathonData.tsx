"use client"
import { useEffect, useState } from 'react'

type props = {
    uri1: string | undefined;
    uri2: string | undefined;
}

/** 
type devpostDataType = {
    id:number;
    source: 'devpost';
    title : string;
    thumbnail_url : string;
    url   :  string
    submission_period_dates : string;
    registrations_count : number
}

type unstopDataType = {
    id:number;
    source : 'unstop';
    title : string;
    banner_mobile : {
        image_url:string;
    };
    seo_url:string;
    start_date:string;
    end_date:string;
    registerCount : number;
}
*/

type devpostDataType= {
    id:number;
    title : string;
    submission_period_dates:string;
    prize_amount:string;
    url:string;
}

type unstopDataType = {
    id:number;
    title : string;
    approved_date:string;
    prizes : {
        cash:number;
    };
    seo_url:string;
}


// type data = {
//     devpost:devpostDataType,
//     unstop :unstopDataType,
//     dorahack:dorahackDataType
// }
 
export function useFetchHackathonData ({uri1,uri2}:props) {
    const [fetchdevpostData,setFetchDevpostData]   = useState<devpostDataType[]>()
    const [fetchunStopData,setFetchUnStopData]     = useState<unstopDataType[]>()

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')
    
    useEffect(() => {
        const fecthdata = async() => {
            try {

                setLoading(true)

                if(!uri1 || !uri2){
                    setError('Uri string not passed!')
                    return
                }

                /** 
                const [devpost,unstop,dorahack] = await Promise.all([
                    fetch(`${uri1}`),
                    fetch(`${uri2}`),
                    fetch(`${uri3}`)
                ])

                if(devpost.ok || unstop.ok || dorahack.ok){
                    setError('Issue Occured Fetching these data')
                    return;
                }
                */
                
                const res = await fetch('/api/fetchHackathon', {
                    method: 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        uri1: uri1,
                        uri2: uri2
                    })
                })

                if(!res.ok){
                    setError('Something must have gotten wrong, fetching data')
                    return 
                }

                const data = await res.json();

                const devpostdatafromapi = data.data[0].hackathons
                const unstopdatafromapi  = data.data[1].data.data

                console.log(devpostdatafromapi);
                console.log(unstopdatafromapi)

                if(!devpostdatafromapi || !unstopdatafromapi){
                    setError('Data is Possibly undefined!')
                    return
                }

                /** 

                // console.log("devpostdatafromapi?.hackathons", devpostdatafromapi?.hackathons);
                // console.log("unstopdatafromapi?.data?.data", unstopdatafromapi?.data?.data);
                // console.log("dorahackdatafromapi?.results", dorahackdatafromapi?.results);

                // setFetchDevpostData(devpostdatafromapi?.hackathons)
                // setFetchUnStopData(unstopdatafromapi?.data?.data)
                // setFetchDorahackData(dorahackdatafromapi?.results)
                */

                setFetchDevpostData(devpostdatafromapi);
                setFetchUnStopData(unstopdatafromapi);
            } catch (error) {
                setError(`Issue Occured while fetching data: ${error}`)
            } finally {
                setLoading(false)
            }
        }

        fecthdata()
    },[uri1,uri2])
    

    return {loading,error,fetchdevpostData,fetchunStopData};
}
