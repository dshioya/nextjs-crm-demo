'use client'

import {useState, useEffect} from 'react'
import NavBar from '@/components/navbar/NavBar'
import {Box, TablePagination} from '@mui/material'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'
import {useFetchCustomers, useFetchParams} from '@/data/CustomerList';

import styles from './page.module.css'

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
  { field: 'postalCode', headerName: '郵便番号', type: 'string', width: 120 },
  { field: 'address', headerName: '住所', type: 'string', width: 180 },
];

export default function CustomerListPage() {
  const {page, setPage} = useFetchParams()
  const {data, mutate} = useFetchCustomers()

  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    if (data) {
      console.log(data)
      mutate()
    }
  }, [page])

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage)
  }


  function PagingToolbar() {
    return (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
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
        />
      </Box>
    </main>
  )
}
