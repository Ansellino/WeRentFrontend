'use client'
import { useOrderList } from '@/lib/hooks/useOrders'
import { useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { Badge } from '@/components/ui/badge'
 
const statusColor: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-teal-100 text-teal-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}
 
export default function OrdersPage() {
  const { data, isLoading } = useOrderList()
  const router = useRouter()
 
  if (isLoading) return <p>Loading orders...</p>

  const orders = data?.data ?? []
 
  return (
    <div className='space-y-4'>
      <h1 className='text-xl font-semibold'>My Orders</h1>
      {orders.length === 0 ? (
         <p className='text-gray-500'>
            You don't seem to have any orders yet <br />
            Start browsing and rent your first item in <span className='text-green-600 font-semibold'>WeRent</span> today!
         </p>
      ) : (
         orders.map(order => (
            <div key={order.id}
               onClick={() => router.push(`/orders/${order.id}`)}
               className='border rounded-lg p-4 cursor-pointer hover:bg-gray-50 space-y-2'
            >
               <div className='flex justify-between items-center'>
                  <p className='font-medium text-sm'>Order #{order.id.slice(0,8)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[order.status]}`}>
                  {order.status}
                  </span>
               </div>
               <p className='text-sm text-gray-500'>{format(parseISO(order.createdAt), 'dd MMM yyyy')}</p>
               <p className='font-medium'>Rp {order.total.toLocaleString('id-ID')}</p>
            </div>
         ))
      )}
    </div>
  )
}
