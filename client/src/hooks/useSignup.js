import { useState } from 'react'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const signup = async (fullname, role, group, email, password, photo, token) => {
    setIsLoading(true)
    setError(null)

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("role", role);
    formData.append("group", group);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("photo", photo);

    const response = await fetch('http://localhost:4000/api/user/create-user', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false)
    }
    return response
  }

  return { signup, isLoading, error }
}