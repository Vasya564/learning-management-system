import { useState } from 'react'

export const useEdit = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const edit = async (formFields, id, token) => {
    setIsLoading(true)
    setError(null)

    const formData = new FormData();

    for (const field in formFields) {
        if (formFields.hasOwnProperty(field)) {
        const value = formFields[field];
        formData.append(field, value);
        }
    }

    const response = await fetch(`http://localhost:4000/api/user/${id}`, {
        method: 'PATCH',
        headers: {
        'Authorization': `Bearer ${token}`
        },
        body: formData
    });

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

  return { edit, isLoading, error }
}