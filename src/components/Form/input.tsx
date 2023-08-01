import { ForwardRefRenderFunction, forwardRef } from 'react'
import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ name, label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        _placeholder={{ color: 'gray.100', fontSize: '0.8rem' }}
        focusBorderColor="pink.500"
        bg="gray.900"
        variant="filled"
        _hover={{ bg: 'gray.900' }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
