import { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from '@chakra-ui/react'
import { RiAddLine as IconAdd } from 'react-icons/ri'
import NextLink from 'next/link'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { useUsers } from '@/hooks/useUsers'
import { queryClient } from '@/lib/queryClient'
import { api } from '@/lib/api'
import { Pagination } from '@/components/Pagination'

export default function UserList() {
  const [page, setPage] = useState(1)

  const { data, isLoading, error, isRefetching } = useUsers(page)

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: async () => {
        const response = await api.get(`users/${userId}`)
        return response.data
      },
      staleTime: 1000 * 60 * 10, // 10 minutes
    })
  }

  if (!data) {
    return null
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Users
              {isRefetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <NextLink href={'/users/create-user'}>
              <Button
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={IconAdd} fontSize="20" />}
              >
                New User
              </Button>
            </NextLink>
          </Flex>
          {isLoading ? (
            <Flex justify={'center'}>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify={'center'}>
              <Text>Error</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={{ sm: '4', lg: '6' }} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Users</Th>
                    {isDesktop && <Th>Register date</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={{ sm: '4', lg: '6' }}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color={'purple.400'}
                              onMouseEnter={() => handlePrefetchUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isDesktop && <Td>{user.created_at}</Td>}
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCount={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
