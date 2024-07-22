import React from 'react'
import CategorizedProductCarousel from '../components/CategorizedProductCarousel'
import NewProductCarousel from '../components/NewProductCarousel'
import { Separator } from '@/components/ui/separator'
export default function Featured() {
          return (
                    <>
                              <NewProductCarousel />
                              <Separator />
                              <p className='my-3 text-start'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio possimus nulla id fugit temporibus nisi doloremque harum voluptas atque eveniet, earum quod, nobis necessitatibus voluptate voluptatum? Rerum nostrum soluta ipsum?</p>
                              <CategorizedProductCarousel />
                    </>
          )
}
