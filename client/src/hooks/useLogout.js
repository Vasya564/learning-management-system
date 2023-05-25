import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userPhoto')

    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}