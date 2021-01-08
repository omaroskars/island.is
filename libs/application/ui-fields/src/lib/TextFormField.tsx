import React, { FC } from 'react'
import {
  FieldBaseProps,
  formatText,
  TextField,
} from '@island.is/application/core'
import { Box } from '@island.is/island-ui/core'
import {
  InputController,
  FieldDescription,
} from '@island.is/shared/form-fields'
import { useFormContext } from 'react-hook-form'
import { useLocale } from '@island.is/localization'
import { useDefaultValue } from '../useDefaultValue'

interface Props extends FieldBaseProps {
  field: TextField
}
const TextFormField: FC<Props> = ({
  autoFocus,
  application,
  error,
  field,
  showFieldName,
}) => {
  console.log('-error', error);
  const {
    id,
    disabled,
    title,
    description,
    placeholder,
    format,
    variant = 'text',
    suffix,
  } = field
  const { clearErrors } = useFormContext()
  const { formatMessage } = useLocale()

  return (
    <div>
      {description && (
        <FieldDescription
          description={formatText(description, application, formatMessage)}
        />
      )}

      <Box paddingTop={2}>
        <InputController
          disabled={disabled}
          id={id}
          placeholder={formatText(
            placeholder || '',
            application,
            formatMessage,
          )}
          label={
            showFieldName
              ? formatText(title, application, formatMessage)
              : undefined
          }
          autoFocus={autoFocus}
          error={error}
          onChange={() => {
            if (error) {
              clearErrors(id)
            }
          }}
          textarea={variant === 'textarea'}
          currency={variant === 'currency'}
          type={
            variant !== 'textarea' && variant !== 'currency' ? variant : 'text'
          }
          format={format}
          suffix={suffix}
          defaultValue={useDefaultValue(field, application)}
        />
      </Box>
    </div>
  )
}

export default TextFormField
