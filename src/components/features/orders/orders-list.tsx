'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn } from '@/lib/utils' // utility for conditional classNames if needed
import { MoveRight } from 'lucide-react'

const orders = [
  {
    id: '#JH-2025-0034',
    date: 'June 21, 2025',
    total: '₦38,500',
    status: 'Delivered'
  },
  {
    id: '#JH-2025-0032',
    date: 'June 10, 2025',
    total: '₦18,000',
    status: 'Processing'
  },
  {
    id: '#JH-2025-0032',
    date: 'June 10, 2025',
    total: '₦18,000',
    status: 'Processing'
  },
  {
    id: '#JH-2025-0032',
    date: 'June 10, 2025',
    total: '₦18,000',
    status: 'Processing'
  },
  {
    id: '#JH-2025-0032',
    date: 'June 10, 2025',
    total: '₦18,000',
    status: 'Processing'
  },
  {
    id: '#JH-2025-0032',
    date: 'June 10, 2025',
    total: '₦18,000',
    status: 'Processing'
  },
  {
    id: '#JH-2025-0032',
    date: 'June 10, 2025',
    total: '₦18,000',
    status: 'Processing'
  }
]

export function Orders () {
  return (
    <Table className='max-w-6xl mx-auto font-satoshi'>
      <TableHeader className='bg-black hover:bg-black'>
        <TableRow className='border border-gray-200'>
          <TableHead className='text-white'>Order #</TableHead>
          <TableHead className='text-white'>Date</TableHead>
          <TableHead className='text-white'>Total</TableHead>
          <TableHead className='text-white'>Status</TableHead>
          <TableHead className='text-white'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={index}>
            <TableCell className='border border-gray-200'>{order.id}</TableCell>
            <TableCell className='border border-gray-200'>
              {order.date}
            </TableCell>
            <TableCell className='border border-gray-200'>
              {order.total}
            </TableCell>
            <TableCell className='border border-gray-200'>
              <span
                className={cn(
                  'inline-flex items-center px-3 py-1 text-xs rounded-full font-medium',
                  order.status === 'Delivered'
                    ? 'bg-green-700 text-white'
                    : 'bg-amber-900 text-white'
                )}
              >
                <span className='w-2 h-2 mr-1 rounded-full bg-white' />
                {order.status}
              </span>
            </TableCell>
            <TableCell className='border border-gray-200'>
              <Button className='rounded-none !px-6 py-1 bg-black text-white hover:bg-gray-800'>
                View Details <MoveRight strokeWidth={1} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
