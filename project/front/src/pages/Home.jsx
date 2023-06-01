import { useEffect, useState } from 'react'

import { useStateContext } from '../lib/authContext'
import { useAxios } from '../lib/useAxios'

import Button from '../components/Button'
import Card from '../components/Card'
import Loader from '../components/Loader'
import axiosClient from '../lib/axiosClient'

export default function Home() {
    const { user } = useStateContext()
    const [pageContent, setPageContent] = useState({data: null})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPagination()
    }, [])

    async function getPagination(url = 'all-jobs') {
        setLoading(true)

        try {
            const { data } = await axiosClient.get(url)
            setPageContent(data)
            window.scrollTo(0, 0)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return (
        <div className='h-[calc(100vh_-_130px)] flex items-center justify-center'>
            <Loader show={loading} />
        </div>
    )

    return (
        <>
            <div className='animeLeft'>
                {pageContent.data !== null ? (
                    <>
                        {pageContent.error ? <h1>{pageContent.error}</h1> : <h1 className='mb-2'>Home</h1>}

                        <div className='flex flex-col gap-4 mb-6'>
                            {pageContent.data.map(j => <Card key={j.id} job={j} user={user} />)}
                        </div>

                        <div className='flex justify-center items-center gap-2'>
                            {pageContent.meta.links.map(l => (
                                l.label !== '&laquo; Previous' &&
                                l.label !== 'Next &raquo;' &&
                                <Button title={l.label} key={l.label} active={l.active} secondary onClick={() => getPagination(l.url)} />
                            ))}
                        </div>
                    </>
                ) : <p>There is no opportunities yet...👀</p>}
            </div>
        </>
    )
}
