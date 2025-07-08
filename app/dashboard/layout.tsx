"use client"
import React, { useEffect, useState } from 'react'
// import { CrumpledPaperIcon } from '@radix-ui/react-icons'
import ProtectedRoute from '@/components/ProtectedRoute'
import SideBarComp from '@/components/SideBarComp'
import { useUser } from '@clerk/nextjs'
import { Bell, Sidebar } from 'lucide-react'
// import SidebarForSmSc from '@/components/SidebarForSmSc'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Dashboardlayoutprops {
    children : React.ReactNode
}

// find user from the database , if user is there nothinh to do , if not create a new user
const DashboardLayout: React.FC<Dashboardlayoutprops> = (props) => {
    // const [userCredit,setUserCredit] = useState<number>()
    const [showSidebar,setShowSideBar] = useState(false)
    const [userProfileUrl,setUserProfileUrl] = useState('/Winnerteam.png')
    
    const { user } = useUser()
    const router = useRouter()

    // useeffect to find user if no user create one.
    useEffect(() => {
      async function FindorcreateUser(){
        try {

            const res = await fetch('/api/findandcreateUser',{
              method : 'POST',
              credentials: 'include',
              headers: {
                'Content-Type' : 'application/json'
              },
            })

            if(!res.ok){
              const errTxt = await res.text()
              console.log(errTxt)
              return ;
            }

            const result = await res.json()

            setUserProfileUrl(result?.data?.profileurl)

          } catch (error) {
            console.log(`Failed to create User: ${error}`)
          }
        }

      FindorcreateUser()
    },[user])
    
    return(
        <ProtectedRoute>
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
                  <p className={`text-xs xs:hidden xs:invisible font-semibold md:visible md:block  `}>Buildyourhackathonteam</p>
                  <div className='flex items-center gap-4'>
                      <div className='flex gap-4 items-center'>
                        <Bell className='size-8 rounded cursor-pointer hover:bg-purple-300 p-2' onClick={() => router.push(`/notification`)} />
                      </div>
                      <Image
                        src={userProfileUrl || "/default-user.jpg"}
                        alt="User Profile"
                        width={150}
                        height={50}
                        className="rounded-[50%] cursor-pointer max-w-sm max-h-52 size-7"
                        onClick={() => router.push('/dashboard/me')}
                      />
                  </div>
                </div>
                {props.children}
              </div>
            </div>
          </main>
        </ProtectedRoute>
    )
}

export default DashboardLayout

        //   {/* changing bakground color  */}
        //   <main className='bg-gradient-to-b from-[#d39f9f] via-purple-50 to-[#e0e0e0]'>
        //     <div className='xs:block md:grid md:grid-cols-7 max-h-screen overflow-x-hidden'>
        //       <div className='col-start-1 col-end-2 border-black border-r md:visible md:block  xs:hidden xs:invisible'>
        //         <SideBarComp />
        //       </div>
        //       {showSidebar ? 
        //       <div className='xs:visible xs:block  md:hidden md:invisible'>
        //         <SidebarForSmSc showSidebar={showSidebar} setShowSideBar={setShowSideBar} />
        //       </div> : 
        //       <div className='col-start-2 col-end-8'>
        //         <div className='flex justify-between px-3 py-2 items-center border-b border-black'>
        //             {/* show this on large screen and hide on small screen */}
        //             <p className={`text-xs xs:hidden xs:invisible font-semibold md:visible md:block  `}>Buildyourhackathonteam</p>
        //             {/* show this on smalll screen and hide this on small scrren  */}
        //             <Sidebar className='size-4 md:hidden md:invisible xs:visible xs:block font-bold' onClick={() => setShowSideBar(!showSidebar)} />
                    // <div className='flex items-center gap-4'>
                    //     <div className='flex gap-4 items-center'>
                    //       <Bell className='size-8 rounded cursor-pointer hover:bg-purple-300 p-2' onClick={() => router.push(`/notification`)} />
                    //     </div>
                    //     <Image
                    //       src={userProfileUrl || "/default-user.jpg"}
                    //       alt="User Profile"
                    //       width={150}
                    //       height={50}
                    //       className="rounded-[50%] cursor-pointer max-w-sm max-h-52 size-7"
                    //       onClick={() => router.push('/dashboard/me')}
                    //     />
                    // </div>
        //         </div>
        //         {props.children}
        //       </div>
        //     }
        //     </div>
        // </main>