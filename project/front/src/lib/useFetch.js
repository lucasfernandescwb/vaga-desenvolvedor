import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(`${import.meta.env.VITE_HOST}/${url}`)

                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                const data = await res.json()

                setLoading(false)
                setData(data)
                setError(null)
            } catch(err) {
                setLoading(false)
                setError(err.message)
            }
        }

        fetchData()
    }, [url])

    return { data, loading, error }
}
