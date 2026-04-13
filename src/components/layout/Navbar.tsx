import Link from 'next/link'

export function Navbar() {
  return (
    <header className='border-b bg-white'>
      <nav className='container mx-auto flex h-14 max-w-5xl items-center justify-between px-4'>
        <Link href='/' className='text-lg font-semibold text-green-700'>
          WeRent
        </Link>
        <div className='flex items-center gap-4 text-sm'>
          <Link href='/products' className='text-gray-700 hover:text-green-700'>
            Products
          </Link>
          <Link href='/wishlist' className='text-gray-700 hover:text-green-700'>
            Wishlist
          </Link>
          <Link href='/orders' className='text-gray-700 hover:text-green-700'>
            Orders
          </Link>
          <Link href='/cart' className='text-gray-700 hover:text-green-700'>
            Cart
          </Link>
        </div>
      </nav>
    </header>
  )
}