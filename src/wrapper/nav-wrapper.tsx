'use client';

import { NavDropdownProvider } from '../context/nav-context';
import React from 'react';

export default function NavDropdownProviderWrapper({ children }: { children: React.ReactNode }) {
  return <NavDropdownProvider>{children}</NavDropdownProvider>;
}