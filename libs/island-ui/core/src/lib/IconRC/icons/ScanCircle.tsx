import * as React from 'react'
import { SvgProps as SVGRProps } from '../Icon'

const SvgScanCircle = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      className="scan-circle_svg__ionicon"
      viewBox="0 0 512 512"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm-40 320h-28a44.05 44.05 0 01-44-44v-28a16 16 0 0132 0v28a12 12 0 0012 12h28a16 16 0 010 32zm0-192h-28a12 12 0 00-12 12v28a16 16 0 01-32 0v-28a44.05 44.05 0 0144-44h28a16 16 0 010 32zm152 148a44.05 44.05 0 01-44 44h-28a16 16 0 010-32h28a12 12 0 0012-12v-28a16 16 0 0132 0zm0-108a16 16 0 01-32 0v-28a12 12 0 00-12-12h-28a16 16 0 010-32h28a44.05 44.05 0 0144 44z" />
    </svg>
  )
}

export default SvgScanCircle