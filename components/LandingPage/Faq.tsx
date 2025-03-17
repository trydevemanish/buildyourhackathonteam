import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const accordian = [
  {
    value : "item-1",
    AccordionTrigger:"What is this platform about?",
    AccordionContent:"It’s a place where you can create or join hackathon teams easily."
  },
  {
    value : "item-2",
    AccordionTrigger:"Can I join a team that matches our skills",
    AccordionContent:"Yes, you can with role like dev,ml,design."
  },
  {
    value : "item-3",
    AccordionTrigger:"Can I be in multiple teams at once",
    AccordionContent:"Yes, you can."
  },
  {
    value : "item-4",
    AccordionTrigger:"How many teams i can create.",
    AccordionContent:"You can create upto 3 team max."
  },
  {
    value : "item-5",
    AccordionTrigger:"Can i change my profile data.",
    AccordionContent:"You can change your profile data."
  },
  {
    value : "item-6",
    AccordionTrigger:"My personal point.",
    AccordionContent:"I am a 3rd yr college student i hardly have went to an hackathon more than once, hardly anyone around me talk abot these things , i eagrly want to participate in hackathon ,but finding team was struggle , Asking people face-to-face felt awkward, and I didn’t know where to start. So ended up creating it."
  },
] 

type Accordion = {
  value:string,
  AccordionTrigger:string,
  AccordionContent:string
}

export default function Faq() {
  return (
    <section className='bg-gradient-to-b from-white via-purple-200 to-white'>
      <div className='xs:px-4 md:px-36 py-8'>
        <p className='pb-4'>
          <span className='text-3xl'>FAQ </span>
          <span className='opacity-70 text-sm'>(frequently asked questions).</span>
        </p>
        <Accordion type="single" collapsible className=' xs:px-8 md:px-32 py-6'>
          {accordian.map((accordiandata:Accordion,idx : number) => (
            <AccordionItem value={accordiandata?.value} key={idx}>
              <AccordionTrigger className='text-xs'>{accordiandata?.AccordionTrigger}</AccordionTrigger>
              <AccordionContent className='text-xs'>{accordiandata?.AccordionContent}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
