import { IOm, IPersonal, Iremito } from '@/interfaces'
import axios from 'axios'
import useSWR, { SWRConfiguration } from 'swr'


const fetcher = (url:any) => axios.get(url).then(res => res.data)

export const useRemito = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error, isLoading, mutate } = useSWR<Iremito[]>(
        [`/api/${ url }`],
        fetcher
    )

    return {
        data: data || [],
        error,
        isLoading,
        mutate
    }

}