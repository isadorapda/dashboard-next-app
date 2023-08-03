import Link from 'next/link'
import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Form/input'
import { signIn } from 'next-auth/react'

export const logInFormSchema = z.object({
  email: z.string().email({ message: 'Please, inform your e-mail.' }),
  password: z
    .string({ required_error: 'Please, inform your password.' })
    .min(6, { message: 'Your password should contain at least 6 characters.' }),
})
type LogInFormData = z.infer<typeof logInFormSchema>

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormData>({ resolver: zodResolver(logInFormSchema) })

  async function handleLogIn(data: LogInFormData) {
    try {
      signIn('app-login', {
        callbackUrl: '/dashboard',
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex
      w={'100vw'}
      h={'100vh'}
      align={'center'}
      justify={'center'}
      flexDir="column"
    >
      <Flex
        as="form"
        w={'100%'}
        maxW={'30vw'}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleLogIn)}
      >
        <Stack spacing="4">
          <Input
            label="E-mail"
            type="email"
            error={errors.email}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >
          Log in
        </Button>
      </Flex>
      <Text>
        Not registered? <Link href={'/sign-in'}>Sing in</Link>
      </Text>
    </Flex>
  )
}
