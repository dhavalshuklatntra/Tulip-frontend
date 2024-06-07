import { default as NextImage } from 'next/image'
import { forwardRef } from 'react'

const CustomImage = (
  {
    alt,
    className,
    loading,
    style,
    onClick,
    priority,
    height,
    width,
    testId,
    src,
    ...props
  },
  ref
) => {
  return (
    <NextImage
      ref={ref}
      alt={alt}
      onClick={onClick}
      loading={loading}
      className={className}
      priority={priority}
      height={height || 'auto'}
      width={width || 'auto'}
      data-testid={testId}
      style={style}
      src={src}
      // fill={true}
      {...props}
    />
  )
}
const Image = forwardRef(CustomImage)
export default Image
