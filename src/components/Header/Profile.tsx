import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>John Doe</Text>
          <Text color="gray.300" fontSize="sm">
            john
          </Text>
        </Box>
      )}
      <Avatar size="md" />
    </Flex>
  )
}
