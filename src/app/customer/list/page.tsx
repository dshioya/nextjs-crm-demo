'use client'

import {ChangeEvent} from 'react'
import {useRouter} from 'next/navigation'
import NavBar from '@/components/navbar/NavBar'
import {Box, Button, TablePagination} from '@mui/material'
import {OpenInNew} from '@mui/icons-material'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'
import {useFetchCustomers, useFetchParams, Customer} from '@/data/CustomerList';

import styles from './page.module.css'

export default function CustomerListPage() {
  const router = useRouter()
  const {page, limit, setPage, setLimit} = useFetchParams()
  const {data, mutate} = useFetchCustomers()

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage)
    mutate()
  }

  function handleChangeRowsPerPage(event: ChangeEvent) {
    const target = (event.target as unknown) as { value: number }

    setPage(0)
    setLimit(target.value)

    mutate()
  }

  function handleDetailCustomerButton(customer: Customer) {
    window.open(`/customer/${customer.id}`)
  }

  function handleRowDoubleClick(customer: Customer) {
    router.push(`/customer/${customer.id}`)
  }

  const columns: GridColDef[] = [
    {
      field: 'code',
      headerName: '顧客コード',
      sortable: false,
      width: 140,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.shopCode}-${params.row.branchNumber.toString().padStart(7, '0')}`
    },
    {
      field: 'fullName',
      headerName: '顧客名',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.lastName} ${params.row.firstName}`
    },
    {field: 'postalCode', headerName: '郵便番号', type: 'string', width: 120},
    {field: 'address', headerName: '住所', type: 'string', width: 320},
    {
      field: 'actions',
      headerName: '',
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Button startIcon={<OpenInNew/>}
                onClick={() => handleDetailCustomerButton(params.row)}>詳細</Button>
      )
    }
  ];

  function PagingToolbar() {
    return (
      <TablePagination
        component="div"
        count={data?.total || 0}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    )
  }

  return (
    <main className={styles.screen}>
      <NavBar title="顧客一覧"/>
      <Box className={styles.screenContent}>
        <DataGrid
          rows={data?.items || []}
          columns={columns}
          pageSizeOptions={[5, 10]}
          slots={{
            pagination: PagingToolbar
          }}
          loading={!data}
          checkboxSelection
          onRowDoubleClick={params => handleRowDoubleClick(params.row)}
        />
      </Box>
    </main>
  )
}
