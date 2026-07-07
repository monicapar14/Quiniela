import { useState, useEffect, useCallback } from 'react'
import api from '../api'

interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.get(url)
        if (!cancelled) {
          setData(response.data)
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message || 'Error al cargar datos')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [url, refetchTrigger])

  return { data, loading, error, refetch }
}

export default useApi
