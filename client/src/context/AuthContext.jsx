import { createContext, useReducer, useEffect } from 'react'
import jwt_decode from "jwt-decode";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const decodedToken = jwt_decode(action.payload)
      const { exp, iat, ...userData} = decodedToken
      return { user: userData, token: action.payload, isLoading: false }
    case 'LOGOUT':
      return { user: null, isLoading: false }
    case 'LOADING':
      return {...state, isLoading: true}
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  })

  const handleStorageChange = () => {
    const userToken = JSON.parse(localStorage.getItem('user'))

    if (userToken) {
      const decodedToken = jwt_decode(userToken)
      const { exp, iat, ...userData} = decodedToken
      dispatch({ type: 'LOGIN', payload: {...userData, token: userToken} }) 
    } else {
      dispatch({ type: 'LOGOUT' })
    }
  }

  useEffect(() => {
    dispatch({ type: 'LOADING' })

    const userToken = JSON.parse(localStorage.getItem('user'))

    if (userToken) {
      dispatch({ type: 'LOGIN', payload: userToken }) 
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }

  },[])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}