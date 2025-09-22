import React, { Suspense } from 'react'
import TeamJoinedByUserDetails from '@/components/fetchedDataComponents/TeamsJoinedAsMember'
import LoadingComponent from '@/components/LoadingComponent'

export default function Page() {
  return (
    <div>
       <Suspense fallback={<LoadingComponent label='Fetching Team Joined.' />}>
        <TeamJoinedByUserDetails />
       </Suspense>
    </div>
  )
}