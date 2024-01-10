'use client'

import {useParams, usePathname} from 'next/navigation'

export default function CustomerDetailPage() {
  const params = useParams()

  console.log(params)

  return (
    <div>customer detail page</div>
  )
}
