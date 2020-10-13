import * as React from 'react'
import { SvgProps as SVGRProps } from '../Icon'

const SvgIceCreamOutline = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => {
  return (
    <svg
      className="ice-cream-outline_svg__ionicon"
      viewBox="0 0 512 512"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M352 256l-96 224-62-145"
      />
      <path
        d="M299.42 223.48C291.74 239.75 275.18 252 256 252c-13.1 0-27-5-33.63-9.76C216.27 237.87 208 240 208 250v62a24.07 24.07 0 01-24 24h0a24.07 24.07 0 01-24-24v-56h-2c-35.35 0-62-28.65-62-64a64 64 0 0164-64h8v-8a88 88 0 01176 0v8h8a64 64 0 010 128c-21.78 0-42-13-52.59-32.51z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </svg>
  )
}

export default SvgIceCreamOutline