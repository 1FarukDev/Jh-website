'use client'

import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion'

interface AccordionItemType {
  title: React.ReactNode
  content: React.ReactNode
}

interface ReusableAccordionProps {
  items: AccordionItemType[]
  defaultValue?: string
}

export default function ReusableAccordion({
  items,
  defaultValue
}: ReusableAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultValue}>
      {items.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className='text-gray-300'>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
