'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type Option = {
  label: string
  value: string
}

interface CustomSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: Option[]
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  className,
  disabled,
}: CustomSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled} >
      <SelectTrigger className={cn('w-[200px]', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
