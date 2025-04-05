import * as React from "react"
import Image, { StaticImageData } from "next/image"
import Slide1 from '@/public/teams.jpg'
import Slide2 from '@/public/slide3.jpg'
import Slide3 from '@/public/slide4.webp'
import Slide4 from '@/public/teams.jpg'
import Slide5 from '@/public/slide6.jpg'
import Slide6 from '@/public/slide7.jpg'

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface Artwork {
  image: StaticImageData
}

export const works: Artwork[] = [
  {
    image: Slide1,
  },
  {
    image: Slide2,
  },
  {
    image: Slide3,
  },
  {
    image: Slide4,
  },
  {
    image: Slide5,
  },
  {
    image: Slide6,
  },
]

export function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-full whitespace-nowrap mb-16 rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork : Artwork ,idx:number) => (
          <figure key={idx} className="shrink-0">
            <div className="overflow-hidden rounded-md relative">
              <Image
                src={artwork.image}
                alt='Hackathon image'
                className="aspect-[4/5] h-fit w-fit object-cover cursor-pointer brightness-50 hover:brightness-100 hover:contrast-50"
                width={200}
                height={100}
              />
            </div>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
