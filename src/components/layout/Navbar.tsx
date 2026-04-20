'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'
import { useState } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const user = useAuthStore(s => s.user)
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const logout = useAuthStore(s => s.logout)
  const hasHydrated = useAuthStore(s => s.hasHydrated)

  if (!hasHydrated) return null

  const isActive = (href: string) =>
    pathname === href
      ? 'text-green-700'
      : 'text-gray-700 hover:text-green-700'

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className='border-b bg-white'>
      <nav className='container mx-auto flex h-14 max-w-5xl items-center justify-between px-4'>
        
        <Link href='/' className='text-lg font-semibold text-green-700'>
          WeRent
        </Link>

        <div className='hidden md:flex items-center gap-4 text-sm'>
          <Link href='/products' className={isActive('/products')}>
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link href='/wishlist' className={isActive('/wishlist')}>
                Wishlist
              </Link>

              <Link href='/orders' className={isActive('/orders')}>
                Orders
              </Link>

              <Link href='/cart' className={isActive('/cart')}>
                Cart
              </Link>

              <span className='text-gray-500'>
                Hi, {user?.name?.split(' ')[0]}
              </span>

              <button
                onClick={handleLogout}
                className='text-gray-700 hover:text-red-500'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href='/login' className={isActive('/login')}>
                Login
              </Link>

              <Link href='/register' className='text-green-700 font-medium'>
                Register
              </Link>
            </>
          )}
        </div>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className='md:hidden flex flex-col gap-1'
        >
          <span className='w-5 h-0.5 bg-gray-700'></span>
          <span className='w-5 h-0.5 bg-gray-700'></span>
          <span className='w-5 h-0.5 bg-gray-700'></span>
        </button>
      </nav>

      {/* Mobile */}
      {open && (
        <div className='md:hidden border-t bg-white px-4 py-3 space-y-3 text-sm'>
          <Link href='/products' className={isActive('/products')}>
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link href='/wishlist' className={isActive('/wishlist')}>
                Wishlist
              </Link>

              <Link href='/orders' className={isActive('/orders')}>
                Orders
              </Link>

              <Link href='/cart' className={isActive('/cart')}>
                Cart
              </Link>

              <div className='text-gray-500'>
                Hi, {user?.name?.split(' ')[0]}
              </div>

              <button
                onClick={handleLogout}
                className='text-left text-gray-700 hover:text-red-500'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href='/login' className={isActive('/login')}>
                Login
              </Link>

              <Link href='/register' className='text-green-700 font-medium'>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}