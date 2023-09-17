import { IPersonal } from '@/interfaces'
import useSWR, { SWRConfiguration } from 'swr'


const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const usePersonal = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error, isLoading } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config)
    const { data, error, isLoading, mutate } = useSWR<IPersonal[]>(
        `/api/${ url }`,
        fetcher,
    )

    return {
        data: data || [],
        error,
        isLoading,
        mutate
    }

}