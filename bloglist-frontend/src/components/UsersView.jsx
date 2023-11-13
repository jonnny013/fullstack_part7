import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import userService from '../services/userInfo'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { useAllUsersDispatch } from '../reducers/AllUsersContext'
import { Link } from 'react-router-dom'

const UsersView = () => {
  const allUserDispatch = useAllUsersDispatch()

  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  })
  const users = result.data

  useEffect(() => {
    allUserDispatch({ type: 'users', payload: users })
  }, [users])


  const style = {
    backgroundColor: 'white',
    fontSize: 20,
    borderBottom: '1px solid black',
    borderRadius: 5,
  }
  return (
    <>
      <h2
        style={{ color: 'rgb(244, 184, 4', textAlign: 'center', fontSize: 25 }}
      >
        Users
      </h2>
      {result.isLoading ? (
        <div style={style}>Loading users...</div>
      ) : (
        <TableContainer style={style}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={style}>
                  <strong>User Name</strong>
                </TableCell>
                <TableCell style={style}>
                  <strong>Blogs created</strong>
                </TableCell>
              </TableRow>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell sx={{ fontSize: 20 }}>
                    <Link to={`/users/${user.id}`} state={{ user }}> {user.name}</Link>
                  </TableCell>
                  <TableCell sx={{ fontSize: 20 }}>
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default UsersView