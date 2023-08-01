import {
  Icon,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ElementType } from 'react'

interface NavLinksProps extends ChakraLinkProps {
  icon: ElementType
  children: string
  href: string
  shouldMatchExactHref?: boolean
}

export function NavLinks({
  icon,
  children,
  shouldMatchExactHref = false,
  href,
  ...rest
}: NavLinksProps) {
  const pathname = usePathname()
  let isActive = false

  if (shouldMatchExactHref && (pathname === href || pathname === rest.as)) {
    isActive = true
  }
  if (
    !shouldMatchExactHref &&
    (pathname.startsWith(href) || pathname.startsWith(String(rest.as)))
  ) {
    isActive = true
  }

  return (
    <Link href={href}>
      <ChakraLink
        as="div"
        display="flex"
        alignItems="center"
        {...rest}
        color={isActive ? 'pink.500' : 'gray.50'}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </Link>
  )
}
