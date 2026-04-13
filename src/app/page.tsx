import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const highlights = [
  {
    title: 'Discover curated pieces',
    text: 'Browse dresses and statement looks by style, size, and rental window.',
  },
  {
    title: 'Book by date',
    text: 'Check availability in real-time and reserve items for your exact event date.',
  },
  {
    title: 'Return with ease',
    text: 'Track orders, shipping, and status updates in one flow from checkout to return.',
  },
]

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white'>
      <main className='container mx-auto max-w-6xl px-4 py-14 sm:py-20'>
        <section className='mx-auto max-w-3xl text-center'>
          <Badge className='bg-emerald-700 text-white hover:bg-emerald-700'>
            We Rent, We Return, We Repeat
          </Badge>
          <h1 className='mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            Fashion rental made simple for every occasion.
          </h1>
          <p className='mt-4 text-base text-gray-600 sm:text-lg'>
            Rent premium fashion without buying. Build your look, set your date, and manage every step in one place.
          </p>

          <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Button asChild className='h-11 bg-emerald-700 px-6 hover:bg-emerald-800'>
              <Link href='/products'>Start Renting</Link>
            </Button>
            <Button asChild variant='outline' className='h-11 px-6'>
              <Link href='/orders'>View My Orders</Link>
            </Button>
          </div>
        </section>

        <section className='mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {highlights.map((item) => (
            <Card key={item.title} className='border-emerald-100'>
              <CardHeader>
                <CardTitle className='text-lg'>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-600'>{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  )
}
