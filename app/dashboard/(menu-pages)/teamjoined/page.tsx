import React, { Suspense } from 'react'
import LoadingComponent from '@/components/LoadingComponent'

const TeamJoinedasaMember = React.lazy(() => import('@/components/fetchedDataComponents/TeamsJoinedAsMember'))

export default function Page() {
  return (
    <div>
       <Suspense fallback={<LoadingComponent label='Fetching Team Joined.' />}>
        <TeamJoinedasaMember />
       </Suspense>
    </div>
  )
}