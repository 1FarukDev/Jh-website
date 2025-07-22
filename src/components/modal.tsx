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
}

const Modal: React.FC<CustomModalProps> = ({
  trigger,
  title,
  description,
  children,
  className
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`${className} [&>button[data-dialog-close]]:hidden  rounded-none !p-0 m-0`}
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
