import { ReactNode, createContext, useContext, useEffect } from 'react'
import { UseDisclosureReturn, useDisclosure } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

interface SidebarDrawerProviderProps {
  children: ReactNode
}

type SidebarDrawerContextData = UseDisclosureReturn

export const SidebarDrawerContext = createContext(
  {} as SidebarDrawerContextData
)

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure()
  const path = usePathname()

  useEffect(() => {
    disclosure.onClose()
  }, [path])

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
