import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import NewsLetter from '@public/assets/png/newsletter.png'
import { Icon } from '@iconify/react/dist/iconify.js'
import ArrowRight from '@/app/assets/svg/arrow-right.svg'
import Information from '@/app/assets/svg/information.svg'
import { createNewsletterSubscription } from '@/services/api/user'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useState } from 'react'

export default function NewsletterSignup () {
  const [email, setEmail] = useState('')

  const createNewsletterSubscriptionMutation = useMutation({
    mutationFn: createNewsletterSubscription,
    onSuccess: () => {
      toast.success('Newsletter subscription created successfully')
      setEmail('')
    },
    onError: () => {
      toast.error('Failed to create newsletter subscription')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    createNewsletterSubscriptionMutation.mutate({ email })
  }

  return (
    <section className='relative min-h-[60vh] flex items-center justify-center mt-[50px]'>
      <Image
        src={NewsLetter}
        alt='Colorful traditional textiles and rugs background'
        fill
        className='object-cover'
        priority
      />
      <div className='relative  text-center max-w-3xl mx-auto px-6'>
        <h2 className='text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide'>
          GET ART UPDATES & {''}<br className='md:block hidden'/>
          STUDIO STORIES
        </h2>

        <p className='text-white/90 text-sm md:text-lg mb-8 font-light font-satoshi'>
          Be the first to see new releases and studio moments.
        </p>

        <div className='max-w-md mx-auto'>
          <form onSubmit={handleSubmit} className='flex flex-row gap-3 border p-1'>
            <div className='relative flex-1'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <Input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='pl-10 py-3 !bg-transparent border-0  font-satoshi placeholder:font-satoshi rounded-none text-gray-900 placeholder:text-gray-500 focus:bg-none'
                disabled={createNewsletterSubscriptionMutation.isPending}
              />
            </div>
            <Button 
              type='submit'
              disabled={createNewsletterSubscriptionMutation.isPending}
              className='bg-white text-black font-satoshi hover:bg-gray-100 px-4 py-3 rounded-none font-medium flex gap-2 items-center'
            >
              {createNewsletterSubscriptionMutation.isPending ? 'Subscribing...' : 'Subscribe'}
              <Image src={ArrowRight} alt='arrow right'/>
            </Button>
          </form>

          <p className='text-white text-xs font-satoshi mt-4 flex items-center justify-center gap-1'>
            <Image src={Information} alt='Information icon'/>
            No spam, just beautiful art or You can unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}