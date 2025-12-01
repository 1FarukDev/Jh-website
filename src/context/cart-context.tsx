'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { toast } from 'sonner'

export interface CartItem {
  id: number
  productId: number
  name: string
  title: string
  price: number
  image: string
  images?: string[]
  category?: string
  exclusivity: 'Exclusive Print' | 'Non-Exclusive Print'
  color?: string
  colorCode?: string
  size: string
  quantity: number
}

interface CartContextProps {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  removeFromCart: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  isInCart: (productId: number) => boolean
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load cart from localStorage on mount
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart))
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
        }
      }
    }
  }, [isClient])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isClient])

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    // Check if item already exists before updating state
    const existingItem = cart.find(
      (cartItem) => cartItem.productId === item.productId
    )

    if (existingItem) {
      // Update quantity if item exists
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      )
      toast.success('Updated quantity in cart!', {
        description: `${item.name} quantity increased`
      })
    } else {
      // Add new item
      const newItem: CartItem = {
        ...item,
        id: Date.now(), // Simple ID generation
        quantity: 1
      }
      setCart((prevCart) => [...prevCart, newItem])
      toast.success('Added to cart!', {
        description: `${item.name} has been added to your cart`
      })
    }
  }

  const removeFromCart = (itemId: number) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId))
    
    if (item) {
      toast.success('Removed from cart', {
        description: `${item.name} has been removed`
      })
    }
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId)
      return
    }

    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    )
  }

  const clearCart = () => {
    if (cart.length > 0) {
      setCart([])
      toast.success('Cart cleared')
    }
  }

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = (): number => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const isInCart = (productId: number): boolean => {
    return cart.some((item) => item.productId === productId)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

