import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

type props =  {
    w : string | number,
    h : string | number
}

export default function Skeletonsize({data}:{data:props}) {
  return (
    <Skeleton className={`rounded`} style={{ width: data?.w, height: data?.h }} />
  )
}
