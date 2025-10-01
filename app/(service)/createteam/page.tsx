"use client"
import React, { Suspense, useState } from 'react'
import { TeamFormationSchema } from '@/Schema/CheckTeamFormationSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, LucideAsterisk } from 'lucide-react'
import { useForm} from "react-hook-form"
import CreateTeam from '@/public/createteam.jpg'
import { CodeSandboxLogoIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField, 
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import { useUser } from '@clerk/nextjs'
import LoadingComponent from '@/components/LoadingComponent'


function CreateHackathonTeamComponent(){
    const [loading,setloading] = useState(false)
    const router = useRouter()
    const {user} = useUser()

    if(user?.id){
        console.log('User id not present')
    }

    const form = useForm<z.infer<typeof TeamFormationSchema>>({
        resolver : zodResolver(TeamFormationSchema),
        defaultValues : {
            teamname : "",
            projectname : "",
            projectdesc : "",
            hackathonname : "",
            hackathonlink: "",
            hackathondesc : ""
        }
    })

    const onSubmit = async(values: z.infer<typeof TeamFormationSchema>) => {
        try {

            setloading(true)
            console.log(user?.id)

            if(!values?.hackathonlink && !values.hackathondesc && !values.hackathonname && !values.projectdesc && !values.projectname && !values.teamname){
                console.log('fields are required')
                return;
            }

            const res = await fetch(`/api/createTeam`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ 
                    teamname:values?.teamname,
                    projectname:values?.projectname, 
                    projectdesc:values?.projectdesc, 
                    hackathonname : values?.hackathonname, 
                    hackathonlink : values?.hackathonlink,
                    hackathondesc: values?.hackathondesc 
                })
            })

            if(!res.ok){
                const errText = await res.json()
                console.log(errText)
                return;
            }

            const data = await res.json()
            
            console.log(data?.message)

            toast.success(data?.message)

            addAsALeaderInteam(data?.data?.id)

            router.refresh()
            router.push('/dashboard')
            
        } catch (error) {
            console.log(error ?? "Failed To create Team")
        } finally {
            setloading(false)
        }
    }

    async function addAsALeaderInteam(teamid:string) {
        try{

        const res = await fetch(`/api/addtoteam/${teamid}`,{
          method : 'POST',
          headers : {
            'Content-Type':'application/json'
          },
          body : JSON.stringify({ teamid:teamid,userId:user?.id })
        })

        if(!res.ok){
            console.log(await res.text())
            return;
        }

        const data = await res.json()

        console.log(data?.message)
        toast.success('added to team as leader.')

        } catch(error){
            console.log(`Issue Coccured while Adding as a team Member : ${error}`)
        }
    }


    return (      
        <div className='flex flex-col items-center justify-center xs:py-5 md:py-10 min-h-screen'>
            <p className='text-xl font-inter font-semibold '>Build your hackathon team.</p>
            <p className='text-[10px] opacity-55'>Note: * options are mandatory.</p>
            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='pt-7 flex flex-col gap-6'>

                        <FormField
                            control={form.control}
                            name="teamname"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='flex gap-1'>
                                    <LucideAsterisk className='size-3' color='red' />
                                    <span className='font-medium'>Team Name :</span> 
                                </FormLabel>
                                <FormControl>
                                    <input {...field} placeholder="Enter team name:" className='border-b bg-neutral-50 shadow-border shadow-md border-purple-400 focus:outline-none xs:text-base md:text-xs px-2 w-96 focus:bg-neutral-50 py-[5px] ml-3' />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="projectname"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='flex gap-1'>
                                    <LucideAsterisk className='size-3' color='red' />
                                    <span className='font-medium'>Project Name :</span> 
                                </FormLabel>
                                <FormControl>
                                    <input {...field} placeholder='Enter Project name:' className='border-b shadow-border shadow-md border-purple-400 focus:outline-none xs:text-base md:text-xs px-2 w-96 focus:bg-neutral-50 py-[5px] ml-3' />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="projectdesc"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='flex gap-1'>
                                    <LucideAsterisk className='size-3' color='red' />
                                    <span className='font-medium'>Project Description :</span> 
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder='Elaborate Project detail:' className='border-b shadow-border shadow-md border-purple-400 focus:outline-none xs:text-base md:text-sm px-2 w-96 ml-3 placeholder:text-xs py-2' />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="hackathonname"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='flex gap-1'>
                                    <LucideAsterisk className='size-3' color='red' />
                                    <span className='font-medium'>Hackathon Name :</span> 
                                </FormLabel>
                                <FormControl>
                                    <input {...field} placeholder='Enter Hackthon name:' className='border-b shadow-border shadow-md border-purple-400 focus:outline-none xs:text-base md:text-xs px-2 w-96 focus:bg-neutral-50 py-[5px] ml-3' />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="hackathonlink"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='flex gap-1'>
                                    <LucideAsterisk className='size-3' color='red' />
                                    <span className='font-medium'>Hackathon Link :</span> 
                                </FormLabel>
                                <FormControl>
                                    <input {...field} placeholder='Hackthon Link:' className='border-b shadow-border shadow-md border-purple-400 focus:outline-none xs:text-base md:text-xs px-2 w-96 focus:bg-neutral-50 py-[5px] ml-3' />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="hackathondesc"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className='flex gap-1'>
                                    <LucideAsterisk className='size-3' color='red' />
                                    <span className='font-medium'>Hackathon Desc:</span> 
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={4} placeholder='Elaborate Hackathon detail , Provide its link also...' className='border-b shadow-border shadow-md border-purple-400 focus:outline-none xs:text-base md:text-sm px-2 w-96 placeholder:text-xs py-2 ml-3' />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    {
                        loading ? 
                        <Loader2 className='size-3 animate-spin' /> : 
                        <div className='flex flex-col items-center justify-center'>
                            <button className='bg-black flex gap-1 text-white border shadow-border shadow-xl border-purple-400 px-12 xs:text-base md:text-xs rounded py-2 items-center'>
                                <CodeSandboxLogoIcon className='size-3' />
                                <span> Create team</span>
                            </button>
                        </div>
                    }
                </form>
            </Form>
        </div>
    )
}


export default function Page() {
    const router = useRouter()

  return (
    <div className='xs:block md:grid md:grid-cols-2'>
        <div className='md:col-start-1 md:col-end-2 xs:hidden xs:invisible md:visible md:block'>
             <Image 
                src={CreateTeam} 
                alt="createTeam" 
                className='container max-h-screen object-cover brightness-50 contrast-125 relative'
                width={600}
                height={900}
                priority
            />
             <div className='absolute top-6 left-6'>
                <button className='font-medium bg-white self-start px-2 py-1 rounded-sm text-xs' onClick={() => router.push('/dashboard')}>  
                    {"< back"}
                </button>
             </div>
        </div>
        <div className='col-start-2 col-end-3 xs:px-4 md:px-14 overflow-y-auto scrollbar-hide max-h-screen'>
            <Suspense fallback={<LoadingComponent label='loading team creation component' />}>
                <CreateHackathonTeamComponent />
            </Suspense>
        </div>
    </div>
  )
}