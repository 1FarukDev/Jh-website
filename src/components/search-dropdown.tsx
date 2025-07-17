import { Search, X } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onClose: () => void
}

function SearchDropdown ({ onClose }: Props) {
  const [searches, setSearches] = useState<string[]>([
    'These Days',
    'These Days',
    'These Days',
    'These Days',
    'These Days'
  ])

  const handleDelete = (index: number) => {
    setSearches(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className='h-[60vh] bg-white w-full pt-10 relative z-50 border-t shadow-md'
      >
        <div className='max-w-2xl mx-auto'>
          <button
            onClick={onClose}
            // className='absolute right-10 top-16 text-gray-700 hover:text-black transition'
            className='w-6 h-6 flex absolute right-10 top-16 text-gray-700  transition items-center justify-center border border-gray-300 rounded-full  '
          >
            <X className='w-5 h-5' />
          </button>

          <div className='flex flex-col sm:flex-row gap-3 border p-1 mt-6'>
            <div className='relative flex-1'>
              <Search
                strokeWidth={1.25}
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5'
              />
              <Input
                type='text'
                placeholder='Search J.H Textile'
                className='pl-10 py-3 !bg-transparent border-0 font-satoshi placeholder:font-satoshi rounded-none text-gray-900 placeholder:text-gray-500'
              />
            </div>
            <Button className='font-satoshi bg-black text-white px-8 py-3 rounded-none font-normal flex gap-2 items-center'>
              Search
            </Button>
          </div>

          <p className='font-satoshi text-base mt-6 mb-2'>Recent searches</p>
          <div className='divide-y border-t'>
            {searches.map((search, index) => (
              <div
                key={index}
                className='flex items-center justify-between py-3 px-1 hover:bg-gray-50 transition-colors'
              >
                <span className='text-sm text-gray-800 font-satoshi'>
                  {search}
                </span>
                <button
                  onClick={() => handleDelete(index)}
                  className='w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-200 transition-all'
                >
                  <X className='w-3.5 h-3.5 text-gray-700' strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

export default SearchDropdown
