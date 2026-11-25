
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Textarea } from '@/components/ui/textarea'
import {
  Field,
  FieldLabel,
} from '@/components/ui/field'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { createDesired } from '../actions/desired'

type BadgeType =
  | 'work'
  | 'health'
  | 'relationships'
  | 'home'
  | 'creativity'
  | 'learning'
  | 'money'
  | 'other'

const BADGE_TYPES: BadgeType[] = [
  'work',
  'health',
  'relationships',
  'home',
  'creativity',
  'learning',
  'money',
  'other'
]

type CardType = 'me' | 'others' | 'both' | 'no idea'

const CARD_TYPES: CardType[] = [
  'me',
  'others',
  'both',
  'no idea'
]

export default function WinsClient() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<CardType | ''>('')
  const [tags, setTags] = useState<BadgeType[]>([])
  const [errors, setErrors] = useState<{
    title?: string
    category?: string
  }>({})

  function toggleTag(t: BadgeType) {
    setTags((current) =>
      current.includes(t)
        ? current.filter((item) => item !== t)
        : [...current, t]
    )
  }

  async function handleSubmit() {
    const newErrors: typeof errors = {}

    if (!title.trim()) {
      newErrors.title = 'Please describe your small win'
    }

    if (!category) {
      newErrors.category = 'Please select a category'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    const formData = new FormData()

    formData.set('title', title.trim())
    formData.set('category', category)

    tags.forEach((tag) => {
      formData.append('tags', tag)
    })

    try {
      await createDesired(formData)
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      alert('Could not save your win.')
    }
  }

  return (
    <div className='mx-auto w-full max-w-2xl px-6 py-12'>
      <div className='grid grid-cols-2 gap-2'>

        <h1 className='col-span-2 text-4xl'>Wins</h1>

        <h3 className='col-span-2 text-2xl'>
          Small counts, start with whatever comes to mind
        </h3>

        <div className='col-span-2 pt-6'>
          <Field>
            <FieldLabel htmlFor="textarea-message" className='text-lg'>
              What felt like a small win for you?
            </FieldLabel>

            <Textarea
              id="textarea-message"
              placeholder="Type your message here."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {errors.title && (
              <p className="text-red-500 text-sm">
                {errors.title}
              </p>
            )}
          </Field>
        </div>

        <h4 className='col-span-2 text-lg pt-6'>
          What was this win connected to?
        </h4>

        <div className='col-span-2 grid grid-cols-2 gap-4'>
          {CARD_TYPES.map((t) => (
            <Card
              key={t}
              onClick={() => {
                setCategory(t)
                setErrors((current) => ({
                  ...current,
                  category: undefined
                }))
              }}
              className={`cursor-pointer transition-colors ${
                category === t
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              <CardHeader>
                <CardTitle>{t}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        {errors.category && (
          <p className="col-span-2 text-red-500 text-sm">
            {errors.category}
          </p>
        )}

        <h4 className='col-span-2 text-lg pt-6'>
          What area of life does this belong to?
        </h4>

        <div className='col-span-2 flex flex-wrap gap-2'>
          {BADGE_TYPES.map((t) => (
            <Badge
              key={t}
              onClick={() => toggleTag(t)}
              className={`cursor-pointer ${
                tags.includes(t)
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
              }`}
            >
              {t}
            </Badge>
          ))}
        </div>

        <div className='col-span-2 flex justify-end'>
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-stone-800 text-white"
          >
            Save
          </Button>
        </div>

      </div>
    </div>
  )
}
