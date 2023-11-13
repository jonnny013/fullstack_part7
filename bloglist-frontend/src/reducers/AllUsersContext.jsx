import { useReducer, createContext, useContext } from 'react'

const allUsersReducer = (state, action) => {
  switch (action.type) {
  case 'users':
    return (state = action.payload)
  default:
    return state
  }
}

const AllUsersContext = createContext()

export const AllUsersContextProvider = props => {
  const [allUsers, allUsersDispatch] = useReducer(allUsersReducer, null)
  return (
    <AllUsersContext.Provider value={[allUsers, allUsersDispatch]}>
      {props.children}
    </AllUsersContext.Provider>
  )
}

export const useAllUsersValue = () => {
  const allUsersAndDispatch = useContext(AllUsersContext)
  return allUsersAndDispatch[0]
}

export const useAllUsersDispatch = () => {
  const allUsersAndDispatch = useContext(AllUsersContext)
  return allUsersAndDispatch[1]
}

export default AllUsersContext
