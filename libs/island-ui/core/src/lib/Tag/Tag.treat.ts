import { styleMap, style } from 'treat'
import { theme } from '@island.is/island-ui/theme'

export const container = style({
  borderRadius: theme.border.radius.large,
  transition: 'color 150ms ease, background-color 150ms ease',
  outline: 0,
  display: 'inline-flex',
  alignItems: 'center',
  height: 32,
  padding: '0 8px',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  maxWidth: '100%',
  border: '1px solid transparent',
})

export const variants = styleMap({
  blue: {
    color: theme.color.blue400,
    backgroundColor: theme.color.blue100,
  },
  darkerBlue: {
    color: theme.color.blue600,
    backgroundColor: theme.color.blue200,
  },
  white: {
    color: theme.color.blue400,
    backgroundColor: theme.color.white,
  },
  purple: {
    color: theme.color.purple400,
    backgroundColor: theme.color.purple100,
  },
  red: {
    color: theme.color.red600,
    backgroundColor: theme.color.red100,
    ':focus': {
      backgroundColor: theme.color.red200,
      color: theme.color.red600,
    },
    ':hover': {
      textDecoration: 'none',
      backgroundColor: theme.color.red200,
      color: theme.color.red600,
    },
  },
  mint: {
    color: theme.color.dark400,
    backgroundColor: theme.color.mint100,
  },
  darkerMint: {
    color: theme.color.dark400,
    backgroundColor: theme.color.mint200,
  },
  rose: {
    color: theme.color.roseTinted400,
    backgroundColor: theme.color.roseTinted100,
  },
  blueberry: {
    color: theme.color.blueberry400,
    backgroundColor: theme.color.blueberry100,
    ':focus': {
      backgroundColor: theme.color.blueberry400,
      color: theme.color.blueberry100,
    },
    ':hover': {
      textDecoration: 'none',
      backgroundColor: theme.color.blueberry400,
      color: theme.color.blueberry100,
    },
  },
  label: {},
})

export const outlined = style({
  backgroundColor: theme.color.white,
  selectors: {
    [`&${variants.blue}`]: {
      borderColor: theme.color.blue200,
      color: theme.color.blue400,
    },
    [`&${variants.darkerBlue}`]: {
      borderColor: theme.color.blue200,
      color: theme.color.blue600,
    },
    [`&${variants.white}`]: {
      borderColor: theme.color.blue200,
      color: theme.color.blue400,
    },
    [`&${variants.purple}`]: {
      borderColor: theme.color.purple200,
      color: theme.color.purple400,
    },
    [`&${variants.red}`]: {
      borderColor: theme.color.red200,
      color: theme.color.red600,
    },
    [`&${variants.mint}`]: {
      borderColor: theme.color.mint200,
      color: theme.color.mint400,
    },
    [`&${variants.darkerMint}`]: {
      borderColor: theme.color.mint200,
      color: theme.color.mint600,
    },
    [`&${variants.rose}`]: {
      borderColor: theme.color.roseTinted200,
      color: theme.color.roseTinted400,
    },
    [`&${variants.blueberry}`]: {
      borderColor: theme.color.blueberry200,
      color: theme.color.blueberry400,
    },
  },

  [':hover']: {
    backgroundColor: theme.color.white,
  },
})

export const active = style({
  selectors: {
    [`&${variants.red}`]: {
      backgroundColor: theme.color.white,
      color: theme.color.red600,
    },
    [`&${variants.blue}`]: {
      backgroundColor: theme.color.white,
      color: theme.color.blue400,
    },
    [`&${variants.blueberry}`]: {
      backgroundColor: theme.color.white,
      color: theme.color.blueberry400,
    },
  },
})

export const attention = style({
  position: 'relative',
  selectors: {
    '&::after': {
      content: '""',
      background: theme.color.red400,
      borderRadius: '50%',
      height: 8,
      position: 'absolute',
      right: -4,
      top: -3,
      width: 8,
    },
  },
})

export const focusable = style({
  ':focus': {
    backgroundColor: theme.color.mint400,
    color: theme.color.dark400,
  },
  ':hover': {
    textDecoration: 'none',
    backgroundColor: theme.color.blue400,
    color: theme.color.white,
  },
})
