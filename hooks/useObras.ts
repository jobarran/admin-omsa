import { IObra } from '@/interfaces'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'

//TODO:: cambiar fetcher por swrconfiguration ver en udemy

const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const useObras = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error, isLoading } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config)
    const { data, error, isLoading } = useSWRImmutable<IObra[]>(`/api${ url }`, fetcher)

    return {
        obras: data || [],
        error,
        isLoading,
    }

}