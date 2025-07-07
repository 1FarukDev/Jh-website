'use client'
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface NavDropdownContextProps {
  isOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

const NavDropdownContext = createContext<NavDropdownContextProps | undefined>(undefined);

export const NavDropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <NavDropdownContext.Provider value={{ isOpen, openDropdown, closeDropdown, toggleDropdown, dropdownRef }}>
      {children}
    </NavDropdownContext.Provider>
  );
};

export const useNavDropdown = () => {
  const context = useContext(NavDropdownContext);
  if (!context) {
    throw new Error('useNavDropdown must be used within a NavDropdownProvider');
  }
  return context;
};