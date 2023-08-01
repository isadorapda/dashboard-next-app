import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Input } from '@/components/Form/input'
import { queryClient } from '@/lib/queryClient'

const createUserFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email(),
  passwords: z
    .object({
      password: z
        .string()
        .min(6, { message: 'Password must contain at least 6 characters' }),
      confirm: z
        .string()
        .min(6, { message: 'Password must contain at least 6 characters' }),
    })
    .refine((data) => data.password === data.confirm, {
      message: `Passwords don't match`,
      path: ['confirm'],
    }),
})

type CreateUserData = z.infer<typeof createUserFormSchema>

export default function CreateUser() {
  const router = useRouter()
  const createUser = useMutation({
    mutationFn: async (user: CreateUserData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      })
      return response.data.user
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserData>({ resolver: zodResolver(createUserFormSchema) })

  const handleCreateUser: SubmitHandler<CreateUserData> = async (data) => {
    await createUser.mutateAsync(data)

    router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Add new user
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                label="Full Name"
                {...register('name')}
                error={errors.name}
              />
              <Input
                label="E-mail"
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                type="password"
                label="Password"
                error={errors.passwords?.password}
                {...register('passwords.password')}
              />
              <Input
                type="password"
                label="Confirm Password"
                error={errors.passwords?.confirm}
                {...register('passwords.confirm')}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href={'/users'}>
                <Button type="button" colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
