'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { Checkbox } from './ui/checkbox'
import { cn } from '@/lib/utils'

interface FormCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  name: string
  label?: string
  wrapperClassName?: string
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  wrapperClassName,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues
  } = useFormContext()

  const error = errors[name]?.message as string | undefined
  const value = getValues(name)

  const handleChange = (checked: boolean) => {
    setValue(name, checked, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return (
    <div className={cn('flex flex-col gap-1', wrapperClassName)}>
      <label className="flex items-center space-x-2 text-sm text-foreground font-satoshi">
        <Checkbox
          className={className}
          checked={!!value}
          onCheckedChange={handleChange}
          aria-invalid={!!error}
          {...register(name)}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  )
}
