'use client'
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode
} from 'react'

interface NavDropdownContextProps {
  isOpen: boolean
  openDropdown: () => void
  closeDropdown: () => void
  toggleDropdown: () => void
  dropdownRef: React.RefObject<HTMLDivElement | null>
  extraRefs?: React.RefObject<HTMLElement | null>[]
  setExtraRefs?: (refs: React.RefObject<HTMLElement | null>[]) => void
}

const NavDropdownContext = createContext<NavDropdownContextProps | undefined>(
  undefined
)

export const NavDropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [extraRefs, setExtraRefs] = useState<
    React.RefObject<HTMLElement | null>[]
  >([])

  const openDropdown = () => setIsOpen(true)
  const closeDropdown = () => setIsOpen(false)
  const toggleDropdown = () => setIsOpen(prev => !prev)

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return
    function handleClick (event: MouseEvent) {
      const isInDropdown =
        dropdownRef.current &&
        dropdownRef.current.contains(event.target as Node)
      const isInExtra = extraRefs.some(
        ref => ref.current && ref.current.contains(event.target as Node)
      )
      if (!isInDropdown && !isInExtra) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, extraRefs])

  return (
    <NavDropdownContext.Provider
      value={{
        isOpen,
        openDropdown,
        closeDropdown,
        toggleDropdown,
        dropdownRef,
        extraRefs,
        setExtraRefs
      }}
    >
      {children}
    </NavDropdownContext.Provider>
  )
}

export const useNavDropdown = () => {
  const context = useContext(NavDropdownContext)
  if (!context) {
    throw new Error('useNavDropdown must be used within a NavDropdownProvider')
  }
  return context
}
