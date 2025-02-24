"use client"
import React from 'react'
import { TeamFormationSchema } from '@/Schema/CheckTeamFormationSchema'
import { zodResolver } from "@hookform/resolvers/zod"
import { LucideAsterisk } from 'lucide-react'
import { useForm} from "react-hook-form"
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

export default function Page() {

    const form = useForm<z.infer<typeof TeamFormationSchema>>({
        resolver : zodResolver(TeamFormationSchema),
    })

    const onSubmit = async(values: z.infer<typeof TeamFormationSchema>) => {
        try {

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
            
        } catch (error) {
            console.log(error ?? "Failed To create Team")
        }
    }

  return (
    <div>
        <div className='px-16 py-10'>
            <p className='text-base'>Build your hackathon team.</p>
            <p className='text-[10px] opacity-55'>Note: * options are mandatory.</p>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className='pt-7 flex flex-col gap-4'>

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
                                <input {...field} placeholder='Elaborate Project detail:' className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' />
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
                                <input {...field} placeholder='Elaborate Hackathon detail , Provide its link also...' className='border-b border-black focus:outline-none text-xs px-2 w-96 py-1 ml-3' />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <button className='bg-black text-white px-12 text-xs rounded py-1 mt-6'>Create team</button>
            </form>
            </Form>
        </div>
    </div>
  )
}