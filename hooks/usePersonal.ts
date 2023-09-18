import { IPersonal } from '@/interfaces'
import useSWR, { SWRConfiguration } from 'swr'


const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const usePersonal = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error, isLoading, mutate } = useSWR<IPersonal[]>(
        `/api/${ url }`,
        fetcher, {
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
              // Never retry on 404.
            //   if (error.status === 404) return
           
              // Never retry for a specific key.
            //   if (key === '/api/user') return
           
              // Only retry up to 10 times.
              if (retryCount >= 10) return
           
              // Retry after 5 seconds.
              setTimeout(() => revalidate({ retryCount }), 2000)
            }
        })

    return {
        data: data || [],
        error,
        isLoading,
        mutate
    }

}