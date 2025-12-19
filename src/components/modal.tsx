'use client'

import React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

interface CustomModalProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Modal: React.FC<CustomModalProps> = ({
  trigger,
  title,
  description,
  children,
  className,
  open,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`${className} [&>button[data-dialog-close]]:hidden  rounded-none gap-0`}
      >
        <DialogHeader className='p-0 m-0 gap-0'>
          {title && <DialogTitle className='p-0 m-0 gap-0'>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
