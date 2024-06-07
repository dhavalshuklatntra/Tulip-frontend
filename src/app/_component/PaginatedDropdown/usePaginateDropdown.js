import { useCallback, useState } from 'react'

import { get } from '@/app/services/axios/client'
import { overRideData } from '@/app/utils/common'
// import { overRideData } from "../utility/other";
// import { get } from "../setup/client";

const usePaginateDropdown = ({
  endpoint,
  staticOptions,
  defaultSearch,
  accessLabelKey,
  accessValueKey,
}) => {
  const [{ clearCache }, setState] = useState({
    clearCache: false,
  })

  //! This is to slowdown the request calls by milliseconds
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined)
      }, ms)
    })
  //! Here if we cannot remove the second argument loadedOptions.
  async function loadOptions(_search, _loadedOptions, { page, options }) {
    try {
      await sleep(800)
      const response = await get(endpoint, {
        ...options,
        search: _search || defaultSearch,
        page: page,
      })

      //! Note : IF dropdown does not have pagination, access response.data.payload directly....
      const data = response.data.data ?? response.data.result
      const pagination = response?.data?.payload?.pagination

      let optionsData = overRideData(data, accessValueKey, accessLabelKey)

      return {
        options: optionsData,
        hasMore: Boolean(pagination?.next),
        additional: {
          options,
          page: page + 1,
        },
      }
    } catch (err) {
      return {
        options: [],
        hasMore: false,
      }
    }
  }
  //! We Want to implement Debounce on the search.
  const wrappedLoadOptions = useCallback(
    (...args) => {
      return loadOptions(...args)
    },
    [endpoint]
  )

  const loadStaticOptions = async () => ({
    options: staticOptions,
    hasMore: false,
  })

  const handleMenuOpen = () => {
    setState((state) => ({
      ...state,
      clearCache: !clearCache,
    }))
  }

  let optionsLoader = staticOptions ? loadStaticOptions : wrappedLoadOptions
  return [
    {
      clearCache,
    },
    {
      wrappedLoadOptions,
      handleMenuOpen,
      loadStaticOptions,
      optionsLoader,
    },
  ]
}

export default usePaginateDropdown
