import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { Pages } from './Pages'

interface PaginationProps {
  totalCount: number
  limit?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagination({
  totalCount,
  limit = 5,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / limit)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < totalPages
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, totalPages)
        )
      : []
  const offset = (currentPage - 1) * limit
  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      spacing="6"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>
          {offset} - {offset + limit} of {totalCount}
        </strong>
      </Box>
      <HStack spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <Pages pageNumber={1} setPage={onPageChange} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length &&
          previousPages.map((page) => {
            return <Pages key={page} pageNumber={page} setPage={onPageChange} />
          })}

        <Pages
          pageNumber={currentPage}
          isCurrent={true}
          setPage={onPageChange}
        />

        {nextPages.length &&
          nextPages.map((page) => {
            return <Pages key={page} pageNumber={page} setPage={onPageChange} />
          })}

        {currentPage + siblingsCount < totalPages && (
          <>
            {currentPage + 1 + siblingsCount < totalPages && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <Pages pageNumber={totalPages} setPage={onPageChange} />
          </>
        )}
      </HStack>
    </Stack>
  )
}
