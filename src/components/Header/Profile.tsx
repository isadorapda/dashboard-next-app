import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { data: session } = useSession()
  return (
    <Flex align="center" onClick={() => signOut()}>
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{session?.user?.name}</Text>
          <Text color="gray.300" fontSize="sm">
            {session?.user?.email}
          </Text>
        </Box>
      )}
      <Avatar size="md" />
    </Flex>
  )
}
