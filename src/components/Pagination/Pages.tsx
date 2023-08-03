import { Button } from '@chakra-ui/react'

interface PagesProps {
  pageNumber: number
  isCurrent?: boolean
  setPage: (page: number) => void
}
export function Pages({ pageNumber, setPage, isCurrent = false }: PagesProps) {
  return isCurrent ? (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="pink"
      disabled
      _disabled={{ bg: 'pink.500', cursor: 'default' }}
    >
      {pageNumber}
    </Button>
  ) : (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{ bg: 'gray.500' }}
      onClick={() => setPage(pageNumber)}
    >
      {pageNumber}
    </Button>
  )
}
