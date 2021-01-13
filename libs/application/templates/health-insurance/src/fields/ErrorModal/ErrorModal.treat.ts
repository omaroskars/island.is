import { style } from 'treat'
import { theme } from '@island.is/island-ui/theme'

const spacing = theme.spacing[2]

export const background = style({
  filter: `drop-shadow(0 4px 70px rgba(0, 97, 255, 0.1))`,
})

export const close = style({
  position: 'absolute',
  top: spacing,
  right: spacing,
  lineHeight: 0,
  padding: spacing,
  outline: 0,
  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export const dialog = style({
  margin: '0 auto',
  padding: '0 24px',
  maxWidth: 888,
})

export const center = style({
  transform: 'translateY(45%)',
})

export const gridFix = style({
  gridGap: '16px',

  '@media': {
    [`screen and (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: 'column-reverse',
    },
  },
})
