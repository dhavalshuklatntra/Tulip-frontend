import { List } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { debounce } from 'lodash'

import Button from '../Button/Button'
import CustomSearch from '../Search/Search'

const InfiniteScrollList = ({ rawData, renderCount, children, isSearch }) => {
  const [list, setList] = useState(rawData?.slice(0, renderCount))
  const [hassearch, setHassearch] = useState(false)
  const onLoadMore = () => {
    setList([
      ...list,
      ...rawData.slice(list.length - 1, list.length + renderCount),
    ])
  }

  const loadMore =
    list.length != rawData.length && !hassearch ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 300,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore} label={'Load more '} />
      </div>
    ) : null
  const onSearch = debounce((e) => {
    if (e.target.value === '') {
      setList(rawData.slice(0, renderCount))
      setHassearch(true)
    }
    const newlist = rawData.filter((elem) =>
      elem.title.includes(e.target.value)
    )
    setList(newlist)
    setHassearch(true)
  }, 300)

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 100,
        overflow: 'auto',
      }}
    >
      {/* <CustomSearch onSearch={onSearch}/> */}
      <InfiniteScroll
        dataLength={list.length}
        next={loadMore}
        hasMore={list.length < rawData.length}
      >
        <List
          dataSource={list}
          itemLayout="vertical"
          renderItem={children}
          loadMore={loadMore}
        />
      </InfiniteScroll>
    </div>
  )
}

export default InfiniteScrollList
