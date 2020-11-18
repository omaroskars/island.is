import React, { FC, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, Input } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'

export interface PhoneFormData {
  tel: string
}

interface Props {
  tel: string
  onSubmit: (data: PhoneFormData) => void
  renderBackButton?: () => JSX.Element
  loading: boolean
}

export const FormStep: FC<Props> = ({
  tel,
  onSubmit,
  renderBackButton,
  loading,
}) => {
  const { formatMessage } = useLocale()
  const { handleSubmit, control, errors, reset } = useForm()

  useEffect(() => {
    if (tel.length > 0)
      reset({
        tel,
      })
  }, [tel])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Controller
          control={control}
          name="tel"
          rules={{
            required: {
              value: true,
              message: formatMessage({
                id: 'sp.settings:tel-required-msg',
                defaultMessage: 'Skylda er að fylla út símanúmer',
              }),
            },
            minLength: {
              value: 7,
              message: formatMessage({
                id: 'sp.settings:tel-required-length-msg',
                defaultMessage: 'Símanúmer þarf að vera 7 tölustafir á lengd',
              }),
            },
            maxLength: {
              value: 7,
              message: formatMessage({
                id: 'sp.settings:tel-required-length-msg',
                defaultMessage: 'Símanúmer þarf að vera 7 tölustafir á lengd',
              }),
            },
            pattern: {
              value: /^\d+$/,
              message: formatMessage({
                id: 'sp.settings:only-numbers-allowed',
                defaultMessage: 'Eingöngu tölustafir eru leyfðir',
              }),
            },
          }}
          defaultValue={tel}
          render={({ onChange, value, name }) => (
            <Input
              label={formatMessage({
                id: 'global:telephone',
                defaultMessage: 'Símanúmer',
              })}
              placeholder={formatMessage({
                id: 'global:telephone',
                defaultMessage: 'Símanúmer',
              })}
              name={name}
              value={value}
              hasError={errors.tel}
              errorMessage={errors.tel?.message}
              onChange={onChange}
            />
          )}
        />
      </Box>
      <Box display="flex" justifyContent="spaceBetween" marginTop={4}>
        {renderBackButton && renderBackButton()}
        <Button
          variant="primary"
          type="submit"
          icon="arrowForward"
          disabled={loading}
        >
          {formatMessage({
            id: 'service.portal:confirm-code',
            defaultMessage: 'Staðfesta',
          })}
        </Button>
      </Box>
    </form>
  )
}
