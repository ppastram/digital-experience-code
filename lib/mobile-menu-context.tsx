"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface MobileMenuContextValue {
  isOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
}

const MobileMenuContext = createContext<MobileMenuContextValue | undefined>(undefined)

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <MobileMenuContext.Provider
      value={{
        isOpen,
        openMenu: () => setIsOpen(true),
        closeMenu: () => setIsOpen(false),
        toggleMenu: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext)
  if (!context) {
    throw new Error("useMobileMenu must be used within MobileMenuProvider")
  }
  return context
}
