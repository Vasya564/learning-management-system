import { useState } from 'react'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const signup = async (fullname, role, group, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/api/user/create-user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ fullname, role, group, email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}