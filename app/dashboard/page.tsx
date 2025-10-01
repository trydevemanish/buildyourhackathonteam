import React,{ Suspense } from 'react'
import LoadingComponent from '@/components/LoadingComponent'

const TeamsCreatedByUser = React.lazy(() => import('@/components/fetchedDataComponents/TeamsCreatedByUser'));

export default function Page() {
  return (
    <main>
      <Suspense fallback={<LoadingComponent label='Searching Your Previous Team....' />}>
        <TeamsCreatedByUser />
      </Suspense>
    </main>
  )
}