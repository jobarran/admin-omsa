import { IAsistencia, IObra } from '@/interfaces'
import useSWR, { SWRConfiguration } from 'swr'


const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const useAsistencia = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error, isLoading, mutate } = useSWR<IAsistencia[]>(
        `/api/${ url }`,
        fetcher
    )

    return {
        data: data || [],
        error,
        isLoading,
        mutate
    }

}