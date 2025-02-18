import React from "react"
import Teamcard from "@/components/Teamcard"

export default function Page() {
  return (
    <div>
        <div className="flex justify-center flex-col items-center py-6">
            <p className="text-sm">Other Hackathon teams people are bulding.</p>
            <p className="text-[11px] opacity-65">Send a request to leader to join a team.</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center pt-2">
            <Teamcard />
            <Teamcard />
            <Teamcard />
            <Teamcard />
            <Teamcard />
            <Teamcard />
        </div>
    </div>
  )
}
