import useSWR from 'swr'
import {create} from 'zustand'

export type Customer = {
  id: string,
  shopCode: string,
  branchNumber: number,
  lastName: string | null,
  firstName: string | null,
  postalCode: string,
  address: String,
  createdAt: string,
  updatedAt: string
}

type CustomerListResponse = {
  items: Customer[],
  total: number
}

type CustomerListParams = {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

export const useFetchParams = create<CustomerListParams>((set) => ({
  page: 0,
  limit: 5,
  setPage: (page: number) => set(state => ({ page })),
  setLimit: (limit: number) => set(state => ({limit}))
}))

async function fetchCustomers() {
  const state = useFetchParams.getState()
  const queryParams = new URLSearchParams({
    page: state.page.toString(),
    limit: state.limit.toString()
  })

  return fetch(`/api/customer/list?${queryParams}`)
    .then(res => res.json() as Promise<CustomerListResponse | null>)
}

export function useFetchCustomers() {
  return useSWR('/api/customer/list', fetchCustomers)
}
