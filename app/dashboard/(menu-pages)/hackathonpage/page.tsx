"use client"
import LoadingComponent from '@/components/LoadingComponent';
import { useFetchHackathonData } from '@/hook/useFetchHackathonData'
import React from 'react'

export default function Page() {
  const { error,fetchdevpostData,fetchunStopData,loading } = useFetchHackathonData({uri1:process.env.NEXT_PUBLIC_DEVPOST_URL_1,uri2:process.env.NEXT_PUBLIC_UNSTOP_URL_2});

  if(!fetchdevpostData || !fetchunStopData || loading){
    return (
      <div>
        <LoadingComponent label='Wait Getting Hackathons data...' />
      </div>
    )
  }

  if(error){
    return (
      <LoadingComponent label='An Issue occured fetching data !' />
    )
  }

  let minLength = Math.min(fetchdevpostData?.length!,fetchunStopData?.length!)
  let arrData = new Array(minLength);

  if(minLength > 100){
    minLength = 100;
  }

  let counterToCheckWhichDatatoadd = 0;

  // counterToCheckWhichDatatoadd = 0 means to add data from fetchDoraHackData arr,
  // counterToCheckWhichDatatoadd = 1 means to add data from fetchdevpostData arr,
  // counterToCheckWhichDatatoadd = 2 means to add data from fetchunStopData arr,

  // for(let i = 0; i < minLength; i++){
  //   if(counterToCheckWhichDatatoadd == 0){
  //     arrData[i] = fetchdevpostData[i];
  //     counterToCheckWhichDatatoadd = 1;
      
  //   } else if (counterToCheckWhichDatatoadd == 1) {
  //     

  //   } else {
  //     arrData[i] = fetchunStopData[i];
  //     counterToCheckWhichDatatoadd = 0;
  //   }
  // }

    for(let i=0; i < minLength; i++){
      let modVal = counterToCheckWhichDatatoadd % 3;

      if(modVal == 0){
        arrData[i] = fetchdevpostData[i];
        counterToCheckWhichDatatoadd++;
      }
      else if(modVal == 1){
        arrData[i] = fetchdevpostData[i];
        counterToCheckWhichDatatoadd++;
      }
      else {
        arrData[i] = fetchunStopData[i];
      counterToCheckWhichDatatoadd++;
      }
    }

  return (
    <div>
      <p>Look For various on going Hackathons!</p>
      {
        arrData.map((data,idx) => (
          <p key={idx}>{data.title}</p>
        ))
      }
    </div>
  )
}