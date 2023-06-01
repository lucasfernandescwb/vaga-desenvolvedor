import { useState, useEffect } from "react";
import axiosClient from './axiosClient'

export const useAxios = (axiosParams) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchData = async (params) => {
        setLoading(true)

        try {
            const { data } = await axiosClient.request(params)
            setData(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(axiosParams)
    }, []);

    return { data, loading, error }
}
