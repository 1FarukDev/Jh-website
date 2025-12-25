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
import { cn } from '@/lib/utils'
import { formatDate } from '@/services/helpers/formatDate'
import { MoveRight } from 'lucide-react'

export interface Order {
  order_number: string
  created_at: string
  total_amount: string | number
  status: 'Delivered' | 'Processing' | string
}

interface OrdersProps {
  orders: Order[]
}

export function Orders({ orders }: OrdersProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        You have no orders yet.
      </div>
    )
  }

  return (
    <Table className="max-w-6xl mx-auto font-satoshi">
      <TableHeader className="bg-black hover:bg-black">
        <TableRow className="border border-gray-200">
          <TableHead className="text-white">Order #</TableHead>
          <TableHead className="text-white">Date</TableHead>
          <TableHead className="text-white">Total</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.order_number}>
            <TableCell className="border border-gray-200">{order.order_number}</TableCell>
            <TableCell className="border border-gray-200">{formatDate(order.created_at)}</TableCell>
            <TableCell className="border border-gray-200">
              {typeof order.total_amount === 'number' ? `₦${order.total_amount.toLocaleString()}` : order.total_amount}
            </TableCell>
            <TableCell className="border border-gray-200">
              <span
                className={cn(
                  'inline-flex items-center px-3 py-1 text-xs rounded-full font-medium',
                  order.status === 'Delivered'
                    ? 'bg-green-700 text-white'
                    : 'bg-amber-900 text-white'
                )}
              >
                <span className="w-2 h-2 mr-1 rounded-full bg-white" />
                {order.status}
              </span>
            </TableCell>
            <TableCell className="border border-gray-200">
              <Button className="rounded-none !px-6 py-1 bg-black text-white hover:bg-gray-800">
                View Details <MoveRight strokeWidth={1} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
