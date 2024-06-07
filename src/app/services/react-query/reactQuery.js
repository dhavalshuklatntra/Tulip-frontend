import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

// import { del, get, patch, post, put } from '../api/client';
// import { getDataFromObjectUsingPaths, getErrorMsg, showToastError, showSuccess } from './common';
import { del, get, patch, post, put } from '../axios/client'
import { getErrorMsg, showError, showSuccess } from '@/app/utils/common'
import { useTranslation } from '@/app/i18n/server'

export const fetcher = async ({ queryKey }) => {
  const [url, params] = queryKey
  const res = await get(url, { ...params })
  const pagination = res.headers?.['x-pagination']
    ? JSON.parse(res.headers?.['x-pagination'])
    : {}
  return { ...res.data, pagination }
}

export const LoadMoreFetcher = async ({ queryKey }) => {
  const [url, params] = queryKey
  const res = await get(url, { ...params })
  return getDataFromObjectUsingPaths(res, ['result'])
}

export const usePrefetch = (url, params) => {
  const queryClient = useQueryClient()

  return () => {
    if (!url) {
      return
    }
    queryClient.prefetchQuery({
      queryKey: [url, params],
      queryFn: fetcher,
    })
  }
}

export const useFetch = (url, params, config = {}) => {
  return useQuery({
    queryKey: [url, params],
    queryFn: fetcher,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime: 0,
    ...config,
  })
}

const useGenericMutation = (
  mutateFunc,
  url,
  params,
  updater,
  config = {},
  headers = {}
) => {
  const { showErrorMsg = true, showSuccMsg = true } = config || {}

  const queryClient = useQueryClient()
  const { t } = useTranslation('common')
  return useMutation({
    mutationFn: mutateFunc,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [url, params] })
      const previousData = queryClient.getQueryData([url, params])
      queryClient.setQueryData([url, params], (oldData) => {
        return updater ? updater(oldData, data) : data
      })
      return previousData
    },
    onError: (data, variables, context) => {
      showErrorMsg && showError(getErrorMsg(error))
      queryClient.setQueryData([url, params], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [url, params] })
    },
    onSuccess: async (res) => {
      showSuccMsg && showSuccess(t(res?.data?.displayMessage))
    },
    ...config,
  })
}
export const useDelete = (url, params, updater, config) => {
  return useGenericMutation(
    (data) => del(url, { data }),
    url,
    params,
    updater,
    config
  )
}

export const usePost = (url, params, updater, config = {}, headers = {}) => {
  return useGenericMutation(
    (data) => post(url, data, headers),
    url,
    params,
    updater,
    config
  )
}

export const useUpdate = (url, params, updater, config) => {
  return useGenericMutation(
    (data) => patch(url, data),
    url,
    params,
    updater,
    config
  )
}

export const usePut = (url, params, headers = {}, updater = null, config) => {
  return useGenericMutation(
    (data) => {
      const { headers, ...newData } = { ...data } // destructure headers from data
      return put(url, newData, { headers })
    },
    url,
    params,
    updater,
    config,
    headers
  )
}
