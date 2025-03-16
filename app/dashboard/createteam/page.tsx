"use client"
import React, { useEffect, useState } from 'react'
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

export default function Page() {
    const [usercredit,setUserCredit] = useState<number>()
    const [loading,setloading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        //when this page will load automaticaaly user intital credit will be fetched.
        findUserTotalCredit()
    },[])

    const form = useForm<z.infer<typeof TeamFormationSchema>>({
        resolver : zodResolver(TeamFormationSchema),
    })

    const onSubmit = async(values: z.infer<typeof TeamFormationSchema>) => {
        try {

            setloading(true)

            toast.loading('creating team.')

            if(usercredit == 0){
                console.log('User is out of credit.')
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
                    hackathondesc: values?.hackathondesc 
                })
            })

            if(!res.ok){
                const errText = await res.text()
                console.log(errText)
                return;
            }

            const data = await res.json()
            console.log(data?.message)

            toast.success(data?.message)

            // call this func to subtract the user credit by 1.
            subtractCredit()

            router.refresh()
            router.push('/dashboard')
            
        } catch (error) {
            console.log(error ?? "Failed To create Team")
        } finally {
            setloading(false)
        }
    }

    async function subtractCredit() {
        try {

            const res = await fetch(`/api/subtractcredit`,{
                method : 'PUT',
                headers : {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({ inititalCredit : usercredit })
            })

            if(!res.ok){
                const errtext = await res.text()
                console.log(errtext)
                return ;
            }

            const data = await res.json()

            console.log(data?.message)
            
        } catch (error) {
            console.log(`Failed to update userCredit: ${error}`)
        }
    }

    async function findUserTotalCredit(){
        try {
           
          const res = await fetch(`/api/findusercredit`)
  
          if(!res.ok){
            const errtext = await res.text()
            console.log(errtext)
            return;
          }
  
          const data = await res.json()
  
          if(!data){
            console.log('Failed to covert res to json')
            return;
          }

          console.log(data?.message)
          
          // need to set the user credit data here 
          setUserCredit(data?.data?.initialCredit)
          
        } catch (error) {
          console.log(`Failed to create User: ${error}`)
        }
    }

  return (
    <div className='grid grid-cols-2 overflow-y-auto scrollbar-hide max-h-[calc(96vh-1rem)] '>
        <div className='col-start-1 col-end-2'>
             <Image src={CreateTeam} alt="createTeam" className='object-contain'/>
        </div>
        <div className='col-start-2 col-end-3 py-16 px-16'>
            <p className='text-lg'>Build your hackathon team.</p>
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
                                    <span className='font-normal'>Team Name :</span> 
                                </FormLabel>
                                <FormControl>
                                    <input placeholder="Enter team name:" {...field} className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' />
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
                                    <span className='font-normal'>Project Name :</span> 
                                </FormLabel>
                                <FormControl>
                                    <input {...field} placeholder='Enter Project name:' className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' />
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
                                    <span className='font-normal'>Project Description :</span> 
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder='Elaborate Project detail:' className='border border-black focus:outline-none text-[9px] px-2 w-96 ml-3 placeholder:text-xs py-2' />
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
                                    <span className='font-normal'>Hackathon Name :</span> 
                                </FormLabel>
                                <FormControl>
                                    <input {...field} placeholder='Enter Hackthon name:' className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' />
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
                                    <span className='font-normal'>Hackathon Desc:</span> 
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={4} placeholder='Elaborate Hackathon detail , Provide its link also...' className='border-b border-black focus:outline-none text-[9px] px-2 w-96 placeholder:text-xs py-2 ml-3' />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    {loading ? 
                    <Loader2 className='size-3 animate-spin' /> : 
                    <button className='bg-black flex gap-1 text-white px-12 text-xs rounded py-2 items-center mt-6'>
                        <CodeSandboxLogoIcon className='size-3' />
                        <span> Create team</span>
                    </button>
                    }
                </form>
            </Form>
        </div>
    </div>
  )
}