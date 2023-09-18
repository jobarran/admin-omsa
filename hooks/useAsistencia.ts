import { IAsistencia, IObra } from '@/interfaces'
import axios from 'axios'
import useSWR, { SWRConfiguration } from 'swr'


const fetcher = (url:any) => axios.get(url).then(res => res.data)

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