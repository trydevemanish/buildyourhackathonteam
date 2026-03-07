"use client"
import LoadingComponent from '@/components/LoadingComponent';
import { useFetchHackathonData } from '@/hook/useFetchHackathonData'
import React from 'react'

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


export default function Page() {
  const { error,fetchdevpostData,fetchunStopData,loading } = useFetchHackathonData({uri1:process.env.NEXT_PUBLIC_DEVPOST_URL_1,uri2:process.env.NEXT_PUBLIC_UNSTOP_URL_2});

  if(!fetchdevpostData || !fetchunStopData || loading){
    return (
      <div>
        <LoadingComponent label='Wait Getting Hackathons data...'/>
      </div>
    )
  }

  if(error){
    return (
      <LoadingComponent label='An Issue occured fetching data !'/>
    )
  }

  let minLength = Math.min(fetchdevpostData?.length!,fetchunStopData?.length!)
  let arrData : (devpostDataType | unstopDataType)[] = [];

  if(minLength > 20){
    minLength = 10;
  }

  for(let i=0; i<minLength;i++){
    arrData.push(fetchdevpostData[i]);
    arrData.push(fetchunStopData[i]);
  }

  return (
    <div>
      <p className='py-2 sm:text-sm text-center md:text-base font-medium'>Some Hackathons Listed <span className='underline underline-offset-2 decoration-violet-500'>from above:--</span> </p>
      <div className='px-2 pt-4 pb-2'>
        <div className='flex items-center gap-1 justify-between w-auto'>
          <p className='bg-purple-300 w-full rounded-sm text-black font-semibold text-center text-base'>id</p>
          <p className='bg-purple-300 w-full rounded-sm text-black font-semibold text-center text-base'>source</p>
          <p className='bg-purple-300 w-full rounded-sm text-black font-semibold text-center text-base'>title</p>
          <p className='bg-purple-300 w-full rounded-sm text-black font-semibold text-center text-base'>start</p>
          <p className='bg-purple-300 w-full rounded-sm text-black font-semibold text-center text-base'>prize</p>
          <p className='bg-purple-300 w-full rounded-sm text-black font-semibold text-center text-base'>view</p>
        </div>

        {/* here i need to set the height position */}
        <div className='flex-row pt-3 pb-2 overflow-y-auto scrollbar-hide max-h-[calc(91vh-6rem)] items-center w-auto'>
          {
            arrData.map((data, idx) => (
              // Abab -> 0 1 2 3 ==> 
              // even refers to devpost
              // odd refers to unstop

              'submission_period_dates' in data ? 
                <HackathonPageComponent
                  key={idx}
                  id={data.id}
                  title={data.title}
                  source="Devpost"
                  prize={data.prize_amount}
                  url={data.url}
                  start={data.submission_period_dates}
                />
                :
                <HackathonPageComponent
                  key={idx}
                  id={data.id}
                  title={data.title}
                  source="Unstop"
                  prize={data.prizes.cash}
                  url={data.seo_url}
                  start={data.approved_date}
                />
            ))
          }
        </div>
      </div>
    </div>
  )
}

/**=------------------------ */
// component for showing hackathon dataas
// id, url, title, 

interface HackathonPageComponentProps {
  id: number;
  title: string;
  source: string;
  start: string;
  prize: string | number;
  url: string;
}


function HackathonPageComponent({
  id,
  title,
  source,
  start,
  prize,
  url,
}: HackathonPageComponentProps ){
  return (
    <div className='pb-1'>
      <div className='flex py-1 rounded-sm text-sm bg-neutral-200 opacity-80 gap-1 items-center justify-between w-auto'>
        <p className='w-full  text-black text-center'>{id}</p>
          <p className='w-full  text-black  text-center'>{source}</p>
          <p className='w-full  text-black  text-center'>{title}</p>
          <p className='w-full  text-black  text-center'>{start}</p>
          <p className='w-full  text-black  text-center'>{prize}</p>
          <p className="w-full text-black text-center">
            <a href={url} target="_blank" rel="noopener noreferrer">
              View
            </a>
          </p>
      </div>
    </div>
  )
}