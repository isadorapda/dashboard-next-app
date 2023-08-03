import Link from 'next/link'
import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Form/input'
import { signIn } from 'next-auth/react'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Please, inform your e-mail.' }),
  name: z.string().optional(),
  password: z
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

type SignInFormData = z.infer<typeof signInFormSchema>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInFormSchema) })

  async function handleSignIn(data: SignInFormData) {
    try {
      signIn('app-login', {
        callbackUrl: '/dashboard',
        name: data.name,
        email: data.email,
        password: data.password.password,
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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            label="Name"
            type="text"
            error={errors.name}
            {...register('name')}
          />
          <Input
            label="E-mail"
            type="email"
            error={errors.email}
            {...register('email')}
          />
          <Input
            label="Password"
            type="password"
            error={errors.password?.password}
            {...register('password.password')}
          />
          <Input
            label="Confirm Password"
            type="password"
            error={errors.password?.confirm}
            {...register('password.confirm')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >
          Sign in
        </Button>
        <Text>
          Already registered? <Link href={'/'}>Log in</Link>
        </Text>
      </Flex>
    </Flex>
  )
}
