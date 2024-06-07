import React from 'react'
import { Checkbox, List } from 'antd'

import InfiniteScrollList from '../../../../_component/InfiniteScrollList/InfiniteScrollList'
import CustomSearch from '../../../../_component/Search/Search'
import Filter from '../../_component/filter/Filter'
import { getFilterObj } from '@/app/utils/common'
const ChallengeFilter = ({ renderData }) => {
  const item = []
  renderData &&
    Object.keys(renderData)?.forEach((elem, indx) => {
      if (getFilterObj(elem).isheader) {
        item.push({
          key: indx,
          label: getFilterObj(elem).header,
          children: (
            <>
              {getFilterObj(elem).isSearch && <CustomSearch />}
              <InfiniteScrollList rawData={renderData[elem]} renderCount={10}>
                {(item) => {
                  return (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Checkbox>{item.title}</Checkbox>}
                      />
                    </List.Item>
                  )
                }}
              </InfiniteScrollList>
            </>
          ),
        })
      } else {
        item.push({
          key: indx,
          label: <Checkbox>{getFilterObj(elem).header}</Checkbox>,
          collapsible: 'disabled',
          showArrow: false,
        })
      }
    })
  return <Filter renderItems={item} />
}

export default ChallengeFilter
