export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)

  const page = +(searchParams.get('page') || 0)

  if (page === 0) {
    return Response.json({
      items: [
        {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
        {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
        {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
        {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
        {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
      ],
      total: 9
    })
  } else {
    return Response.json({
      items: [
        {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
        {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
        {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
        {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65}
      ],
      total: 9
    })
  }
}
