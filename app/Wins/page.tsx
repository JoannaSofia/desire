
import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import {
  Field,
  FieldLabel,
} from "@/components/ui/field"
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function Wins() {
  return (
    <div className='mx-auto w-full max-w-2xl px-6 py-12'>
      <div className='grid grid-cols-2 gap-6'>

        <h1 className='col-span-2 text-4xl'>Wins</h1>

        <h3 className='col-span-2 text-2xl'>
          Small counts, start with whatever comes to mind
        </h3>

        <div className='col-span-2'>
          <Field>
            <FieldLabel htmlFor="textarea-message" className='text-lg'>
              What felt like a small win for you?
            </FieldLabel>
            <Textarea
              id="textarea-message"
              placeholder="Type your message here."
            />
          </Field>
        </div>

        <h4 className='col-span-2 text-lg'>
          What was this win connected to?
        </h4>

        <div className='col-span-2 grid grid-cols-2 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>
            Something that I want
            </CardTitle>
            </CardHeader>
            </Card>
          <Card>
            <CardHeader>
              <CardTitle>
            Something someone else wants
            </CardTitle>
            </CardHeader>
            </Card>
          <Card>
            <CardHeader>
              <CardTitle>
            Both
            </CardTitle>
            </CardHeader>
            </Card>
          <Card>
            <CardHeader>
              <CardTitle>
            I am not sure
            </CardTitle>
            </CardHeader>
            </Card>
        </div>

        <h4 className='col-span-2 text-lg'>
          What area of life does this belong to?
        </h4>

        <div className='col-span-2 flex flex-wrap gap-2'>
          <Badge className='bg-stone-700 text-white'>Work</Badge>
          <Badge className='bg-stone-700 text-white'>Health</Badge>
          <Badge className='bg-stone-700 text-white'>Relationships</Badge>
          <Badge className='bg-stone-700 text-white'>Home</Badge>
          <Badge className='bg-stone-700 text-white'>Creativity</Badge>
          <Badge className='bg-stone-700 text-white'>Learning</Badge>
          <Badge className='bg-stone-700 text-white'>Money</Badge>
          <Badge className='bg-stone-700 text-white'>Other</Badge>
        </div>

        <div className='col-span-2 flex justify-end'>
          <Button variant="default" className="bg-stone-800 text-white">Save</Button>
        </div>

      </div>
    </div>
  )
}
