import * as React from 'react'
import { SvgProps as SVGRProps } from '../Icon'

const SvgThunderstormSharp = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      className="thunderstorm-sharp_svg__ionicon"
      viewBox="0 0 512 512"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M405.84 136.9a151.25 151.25 0 00-47.6-81.9 153 153 0 00-241.81 51.86C60.5 110.16 16 156.65 16 213.33 16 272.15 63.91 320 122.8 320h72.31L176 416h48v80l112-144h-43.51l8-32h103.84a91.56 91.56 0 001.51-183.1z" />
      <path d="M74.53 407.177l38.32-76.622 28.62 14.313-38.32 76.623zm23.99 64.012l30.318-60.622 28.62 14.313-30.317 60.622zm256.021-64l38.32-76.623 28.62 14.314-38.32 76.622zm24.001 64.011l30.317-60.622 28.62 14.314-30.317 60.621z" />
    </svg>
  )
}

export default SvgThunderstormSharp