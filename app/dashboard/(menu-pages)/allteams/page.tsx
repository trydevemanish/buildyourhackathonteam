import React, { Suspense } from "react"
import AllTeam from "@/components/fetchedDataComponents/AllTeam"
const LoadingComponent = React.lazy(() => import('@/components/LoadingComponent'))


export default function Page() {
  return (
    <main className="overflow-y-auto scrollbar-hide h-auto max-h-[calc(97vh-1rem)]">
        <div className="flex justify-center gap-2 flex-col items-center py-4 border">
            <p className="text-base">Other Hackathon teams people are bulding.</p>
            <p className="text-[11px] opacity-65">Send a request to 
              <span className="text-purple-500"> leader to join a team.</span>
            </p>
        </div>

        <Suspense fallback={<LoadingComponent label="Wait fetching others teams..."/>}>
          <AllTeam />
        </Suspense>
    </main>
  )
}
