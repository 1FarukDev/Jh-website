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
        className='h-[90vh] sm:h-[80vh] md:h-[70vh] lg:h-[60vh] overflow-y-auto no-scrollbar px-4 sm:px-6 lg:px-8 bg-white w-full relative z-50 border-t shadow-md'
      >
        <div className='max-w-2xl mx-auto pt-4 sm:pt-6 lg:pt-8'>
          {/* Close Button */}
          <button
            onClick={onClose}
            className='w-8 h-8 sm:w-10 sm:h-10 flex absolute right-4 top-2 sm:right-6 sm:top-4 lg:right-8 lg:top-6 text-gray-700 hover:text-gray-900 transition-colors items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100'
          >
            <X className='w-4 h-4 sm:w-5 sm:h-5' />
          </button>

          {/* Search Input */}
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 border border-gray-200 p-2 sm:p-3 mt-4 sm:mt-6 rounded-sm'>
            <div className='relative flex-1'>
              <Search
                strokeWidth={1.25}
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5'
              />
              <Input
                type='text'
                placeholder='Search J.H Textile'
                className='pl-8 sm:pl-10 py-2 sm:py-3 !bg-transparent border-0 font-satoshi placeholder:font-satoshi rounded-none text-sm sm:text-base text-gray-900 placeholder:text-gray-500 focus:ring-0'
              />
            </div>
            <Button className='font-satoshi bg-black text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-none font-normal text-sm sm:text-base whitespace-nowrap hover:bg-gray-800 transition-colors'>
              Search
            </Button>
          </div>

          {/* Recent Searches */}
          <div className='mt-6 sm:mt-8'>
            <p className='font-satoshi text-sm sm:text-base font-medium text-gray-800 mb-3 sm:mb-4'>
              Recent searches
            </p>
            <div className='divide-y divide-gray-200 border-t border-gray-200 rounded-sm'>
              {searches.length > 0 ? (
                searches.map((search, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between py-3 sm:py-4 px-2 sm:px-3 hover:bg-gray-50 transition-colors group'
                  >
                    <span className='text-sm sm:text-base text-gray-800 font-satoshi truncate pr-4'>
                      {search}
                    </span>
                    <button
                      onClick={() => handleDelete(index)}
                      className='w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-200 hover:border-gray-400 transition-all flex-shrink-0'
                      aria-label={`Remove "${search}" from recent searches`}
                    >
                      <X className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-700' strokeWidth={1.5} />
                    </button>
                  </div>
                ))
              ) : (
                <div className='py-8 sm:py-12 text-center'>
                  <p className='text-sm sm:text-base text-gray-500 font-satoshi'>
                    No recent searches
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Popular Searches (Optional Enhancement) */}
          {/* <div className='mt-6 sm:mt-8 pb-4 sm:pb-6'>
            <p className='font-satoshi text-sm sm:text-base font-medium text-gray-800 mb-3 sm:mb-4'>
              Popular searches
            </p>
            <div className='flex flex-wrap gap-2 sm:gap-3'>
              {['Fabrics', 'Cotton', 'Silk', 'Linen', 'Patterns'].map((term, index) => (
                <button
                  key={index}
                  className='px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-satoshi bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors border border-gray-200'
                >
                  {term}
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

export default SearchDropdown