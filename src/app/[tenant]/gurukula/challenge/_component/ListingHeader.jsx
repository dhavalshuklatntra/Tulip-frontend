import React from 'react'

import Carousal from '@/app/_component/Carousal/Carousal'
import ListingHeaderTile from '../../_component/ListingHeaderTile/ListingHeaderTile'
import { getHeaderImage, removeWhiteSpaces } from '@/app/utils/common'
import ListingHeaderSkelton from '@/app/_component/Sekelton/ListingHeaderSkelton'
import { useTranslation } from '@/app/i18n/server'
const ListingHeader = ({ data, isloading }) => {
  const { t } = useTranslation('listingheaders')
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    swipeToSlide: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Carousal setting={settings}>
      {isloading && <ListingHeaderSkelton />}
      {data?.map((item, indx) => (
        <ListingHeaderTile
          key={indx}
          count={item.value}
          title={t(`challenge.${removeWhiteSpaces(item.key).toLowerCase()}`)}
          image={getHeaderImage(item.key)}
        />
      ))}
    </Carousal>
  )
}

export default ListingHeader
