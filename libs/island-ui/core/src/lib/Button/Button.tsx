import * as React from 'react'
import { AllHTMLAttributes, forwardRef, ReactNode } from 'react'
import { Button as ReaButton } from 'reakit/Button'
import cn from 'classnames'

import { Box } from '../Box/Box'
import * as styles from './Button.treat'
import { Icon } from '../IconRC/Icon'
import { Icon as IconType, Type } from '../IconRC/iconMap'

// TODO: refine types, ex. if circle is true there should be no children. and filter variants with conditional types

type NativeButtonProps = AllHTMLAttributes<HTMLButtonElement>
type PrimaryButtonType = {
  variant?: 'primary'
  colorScheme?: keyof typeof styles.colors.primary
  circle?: boolean
}
type GhostButtonType = {
  variant?: 'ghost'
  colorScheme?: keyof typeof styles.colors.ghost
  circle?: boolean
}
type TextButtonType = {
  variant?: 'text'
  colorScheme?: keyof typeof styles.colors.text
  circle?: never
}
type UtilityButtonType = {
  variant?: 'utility'
  colorScheme?: keyof typeof styles.colors.utility
  circle?: never
}

export type ButtonTypes =
  | PrimaryButtonType
  | GhostButtonType
  | TextButtonType
  | UtilityButtonType

export interface ButtonProps {
  id?: NativeButtonProps['id']
  onClick?: NativeButtonProps['onClick']
  onFocus?: NativeButtonProps['onFocus']
  onBlur?: NativeButtonProps['onBlur']
  children?: ReactNode
  size?: Exclude<keyof typeof styles.size, 'utility' | 'textSmall'>
  disabled?: boolean
  focusable?: boolean
  fluid?: boolean
  icon?: IconType
  iconType?: Type
  preTextIcon?: IconType
  preTextIconType?: Type
  type?: NativeButtonProps['type']
  lang?: string
  loading?: boolean
  nowrap?: boolean
  title?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps & ButtonTypes>(
  (
    {
      variant = 'primary',
      colorScheme = 'default',
      size = 'default',
      icon,
      iconType = 'filled',
      preTextIcon,
      preTextIconType = 'filled',
      children,
      circle,
      type = 'button',
      fluid,
      disabled,
      loading,
      nowrap,
      ...buttonProps
    },
    ref,
  ) => {
    return (
      <Box
        component={ReaButton}
        as={variant === 'text' ? 'span' : 'button'}
        ref={ref}
        type={type}
        className={cn(
          styles.variants[variant],
          styles.colors[variant][colorScheme],
          {
            [styles.size[size]]:
              variant !== 'utility' &&
              !circle &&
              !(variant === 'text' && size === 'small'),
            [styles.fluid]: fluid,
            [styles.nowrap]: nowrap,
            [styles.size.utility]: variant === 'utility',
            [styles.size.textSmall]: variant === 'text' && size === 'small',
            [styles.circleSizes[size]]: circle,
            [styles.circle]: circle,
            [styles.padding[size]]:
              variant !== 'utility' && variant !== 'text' && !circle,
            [styles.padding.text]: variant === 'text',
            [styles.padding.utility]: variant === 'utility',
            [styles.isEmpty]: !children,
            [styles.loading]: loading,
          },
        )}
        disabled={disabled || loading}
        {...buttonProps}
      >
        {loading && variant !== 'text' ? (
          <>
            {preTextIcon && (
              <ButtonIcon
                icon={preTextIcon}
                type={preTextIconType}
                transparent
                preText
              />
            )}
            <span className={styles.hideContent}>{children}</span>
            {icon && <ButtonIcon icon={icon} type={iconType} transparent />}
            <div
              className={cn(styles.loader, { [styles.loadingCircle]: circle })}
            >
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
            </div>
          </>
        ) : (
          <>
            {preTextIcon && (
              <ButtonIcon icon={preTextIcon} type={preTextIconType} preText />
            )}
            {children}
            {icon && <ButtonIcon icon={icon} type={iconType} />}
          </>
        )}
      </Box>
    )
  },
)

type ButtonIconProps = {
  icon: ButtonProps['icon']
  type: ButtonProps['iconType']
  transparent?: boolean
  preText?: boolean
}

const ButtonIcon = ({ icon, type, transparent, preText }: ButtonIconProps) => (
  <Icon
    icon={icon!}
    type={type!}
    color={transparent ? 'transparent' : 'currentColor'}
    className={cn(
      styles.icon,
      preText ? styles.iconPreText : styles.iconPostText,
    )}
    skipPlaceholderSize
  />
)
