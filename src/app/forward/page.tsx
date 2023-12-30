import LoadingMask from '@/components/LoadingMask'
import {useSession} from 'next-auth/react'
import {redirect} from 'next/navigation'

export function ForwardPage() {
  const {data: session, status} = useSession()

  if (status === 'loading') {
    return <LoadingMask/>
  }

  if (status === 'authenticated') {
    redirect('/customer/list')
  } else {
    redirect('/')
  }
}
