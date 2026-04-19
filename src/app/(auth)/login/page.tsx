'use client'
import { useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/lib/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
})
 
type FormData = z.infer<typeof schema>

type AuthError = {
  response?: {
    data?: {
      message?: string
    }
  }
}
 
export default function LoginPage() {
  const router = useRouter()
  const setAuth = useAuthStore(s => s.setAuth)
  const { toast } = useToast()
 
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
 
  const { mutate, isPending } = useMutation({
    mutationFn: authApi.login,

    onSuccess: (res) => {
      const { access_token, refresh_token, user } = res.data

      setAuth(access_token, refresh_token, user)

      toast({
        title: 'Login berhasil',
        description: 'Selamat datang!',
      })

      router.push('/dashboard')
    },

    onError: (error: AuthError) => {
      toast({
        title: 'Login gagal',
        description:
          error?.response?.data?.message ||
          'Email atau password salah',
        variant: 'destructive',
      })
    },
  })
 
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-sm space-y-6'>
        <h1 className='text-2xl font-semibold text-center'>WeRent</h1>

        <form onSubmit={handleSubmit(d => mutate(d))} className='space-y-4'>
          <div>
            <Input placeholder='Email' {...register('email')} />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type='password'
              placeholder='Password'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className='text-center text-sm'>
          No account?{' '}
          <a href='/register' className='text-green-700 underline'>
            Register
          </a>
        </p>
      </div>
    </div>
  )
}