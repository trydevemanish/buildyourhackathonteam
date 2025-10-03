"use client"
import Image from 'next/image'
import { Bell } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import SideBarComp from '@/components/SideBarComp'
// import ProtectedRoute from '@/components/ProtectedRoute'
import React, { useState } from 'react'
import DefaultImage from '@/public/default-user.jpg'

interface Dashboardlayoutprops {
    children : React.ReactNode
}

const DashboardLayout: React.FC<Dashboardlayoutprops> = (props) => {
    const [showSidebar,setShowSideBar] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { user } = useUser()
    
    return(
        // <ProtectedRoute>
          <main className='bg-gradient-to-b min-h-screen from-[#ffffff] via-purple-50 to-[#ffffff]'>
            <div className="xs:block md:grid md:grid-cols-7 max-h-screen overflow-x-hidden">
              {/* Sidebar */}
              <div
                className={`
                  md:col-start-1 md:col-end-2
                  border-black border-r
                  md:block
                  md:static md:translate-x-0
                  fixed top-0 left-0 h-full w-full z-50 bg-white shadow-lg
                  transition-transform duration-300 ease-in-out
                  md:transform-none
                  ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
                `}
              >
                <SideBarComp closeSidebar={() => setShowSideBar(false)} />
              </div>
              <div className="md:col-start-2 md:col-end-8">
                <div className="flex justify-between px-3 py-2 items-center border-b border-black">
                  <button
                    className="md:hidden xs:block text-xl font-bold"
                    onClick={() => setShowSideBar(!showSidebar)}
                  >
                    ☰
                  </button>
                  <p className={`text-xs xs:hidden xs:invisible font-semibold md:visible md:block  `}>
                    
                    {
                      !['/dashboard', '/dashboard/otherdev', '/dashboard/allteams', '/dashboard/hackathonpage', '/dashboard/teamjoined'].includes(pathname) 
                      && 
                      <span onClick={() => router.back()} className='px-2 py-1 cursor-pointer bg-emerald-300 rounded-md leading-4 mr-3 text-[10px] text-center shadow-sm font-semibold '>{"<- back"}</span>
                    }
                    <span>Buildyourhackathonteam</span>
                  </p>
                  <div className='flex items-center gap-4'>
                      <div className='flex gap-4 items-center'>
                        <Bell className='size-8 rounded cursor-pointer hover:bg-purple-300 p-2' onClick={() => router.push(`/notification`)} />
                      </div>
                      <Image
                        src={user ? user.imageUrl : DefaultImage}
                        alt="User Profile"
                        width={150}
                        height={50}
                        priority
                        className="rounded-[50%] cursor-pointer max-w-sm max-h-52 size-7"
                        onClick={() => router.push('/dashboard/me')}
                      />
                  </div>
                </div>
                {props.children}
              </div>
            </div>
          </main>
        // </ProtectedRoute>
    )
}

export default DashboardLayout


    // const [userProfileUrl,setUserProfileUrl] = useState('/Winnerteam.png')
    // const fetchedUserOrCreateUserData = useRef(false)

    // const router = useRouter()

    // useEffect(() => {
    //   async function FindorcreateUser(){
    //     try {

    //         // if(fetchedUserOrCreateUserData.current) return 
    //         // fetchedUserOrCreateUserData.current = true;

    //         console.log('No of time this function is called and userId',user?.id)

    //         const res = await fetch('/api/findandcreateUser',{
    //           method : 'POST',
    //           credentials: 'include',
    //           headers: {
    //             'Content-Type' : 'application/json'
    //           },
    //           body : JSON.stringify({userId:user?.id})
    //         })

    //         if(!res.ok){
    //           const errTxt = await res.json()
    //           console.log(errTxt?.message) 
    //           return ;
    //         }

    //         // const result = await res.json()

    //         // setUserProfileUrl(result?.data?.profileurl)

    //       } catch (error) {
    //         console.log(`Failed to create User: ${error}`)
    //       }
    //     }

    //   FindorcreateUser()
    // },[user])