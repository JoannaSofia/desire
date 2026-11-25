import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Dashboard() {
  return (
    <div className='mx-auto w-full max-w-2xl px-6 py-12'>
      <div className='grid grid-col-1 gap-6'>
        <div className='flex justify-self-end'>
          <Button variant="link" className='border border-stone-300 w-24 rounded-full'>Add win</Button>
        </div>
        <Card>
          <CardHeader>
            <CardContent className='flex flex-col-2 justify-between'>
              <div>Category</div>
              <div>Date</div>
            </CardContent>
            <CardTitle>Cardtitle</CardTitle>
          </CardHeader>
          <CardFooter className='flex flex-col-2 justify-between'>
            <Badge variant="default" className='bg-stone-600 text-white'>Tag</Badge>
            <div className='flex flex-col-2 gap-6'>
              <div>Edit</div>
              <div>Delete</div>
            </div>
          </CardFooter>
        </Card>
         <Card>
          <CardHeader>
            <CardContent className='flex flex-col-2 justify-between'>
              <div>Category</div>
              <div>Date</div>
            </CardContent>
            <CardTitle>Cardtitle</CardTitle>
          </CardHeader>
          <CardFooter className='flex flex-col-2 justify-between'>
            <Badge variant="default" className='bg-stone-600 text-white'>Tag</Badge>
            <div className='flex flex-col-2 gap-6'>
              <div>Edit</div>
              <div>Delete</div>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardContent className='flex flex-col-2 justify-between'>
              <div>Category</div>
              <div>Date</div>
            </CardContent>
            <CardTitle>Cardtitle</CardTitle>
          </CardHeader>
          <CardFooter className='flex flex-col-2 justify-between'>
            <Badge variant="default" className='bg-stone-600 text-white'>Tag</Badge>
            <div className='flex flex-col-2 gap-6'>
              <div>Edit</div>
              <div>Delete</div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
