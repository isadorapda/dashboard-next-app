import { Flex, Icon, Input } from '@chakra-ui/react'
import { RiSearchLine as IconSearch } from 'react-icons/ri'

interface SearchboxProps {
  isMobile?: boolean
}

export function SearchBox({ isMobile = false }: SearchboxProps) {
  return isMobile ? (
    <Flex
      as="label"
      pos={'absolute'}
      bottom="6"
      left={'8'}
      py="2"
      px="8"
      color="gray.200"
      bg="gray.600"
      borderRadius="full"
      w={'80%'}
    >
      <Input
        color="gray.red.50"
        px="4"
        mr="4"
        variant="unstyled"
        placeholder="Search..."
        _placeholder={{ color: 'gray.400' }}
      />
      <Icon as={IconSearch} fontSize="20" />
    </Flex>
  ) : (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxW={400}
      alignSelf="center"
      color="gray.200"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.red.50"
        px="4"
        mr="4"
        variant="unstyled"
        placeholder="Search..."
        _placeholder={{ color: 'gray.400' }}
      />
      <Icon as={IconSearch} fontSize="20" />
    </Flex>
  )
}
