import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine as IconMenu } from 'react-icons/ri'
import { Profile } from './Profile'
import { NotificationsNav } from './NotificationsNav'
import { SearchBox } from './SearchBox'
import { Logo } from './Logo'
import { useSidebarDrawer } from '@/contexts/SidebarDrawerContext'

export function Header() {
  const { onOpen } = useSidebarDrawer()

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex as="header" w="100vw" h="20" mx="auto" mt="4" px="6" align="center">
      {!isDesktop && (
        <IconButton
          aria-label="Open sidebar navigation"
          icon={<Icon as={IconMenu} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mt="2"
        ></IconButton>
      )}
      <Logo />
      {isDesktop && <SearchBox />}
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isDesktop} />
      </Flex>
    </Flex>
  )
}
