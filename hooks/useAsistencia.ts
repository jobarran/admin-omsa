import { IAsistencia, IObra } from '@/interfaces'
import useSWR, { BareFetcher, Key, Middleware, SWRConfiguration, SWRHook } from 'swr'
import useSWRImmutable from 'swr/immutable'


const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const useAsistencia = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error, isLoading } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config)
    const { data, error, isLoading, mutate } = useSWR<IAsistencia[]>(
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