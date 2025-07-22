import React, { createContext,useState } from "react"

export const UserDataContext = createContext()

const UserContext = ({children}) => {

  const baseUrl = import.meta.env.VITE_BASE_URL
  const [user, setUser] = useState({
      fullname:{
        firstname:'',
        lastname:'',
      },      
      email:'',
      password:''
    })
  const values = {
    baseUrl,
    user,
    setUser
  }

  return (

    <UserDataContext.Provider value={values}>
      {children}
    </UserDataContext.Provider>
  )
}
export default UserContext