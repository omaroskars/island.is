import React, { FC, useContext } from 'react'
import { useRouter } from 'next/router'
import { ProcessPageLayout } from '@island.is/skilavottord-web/components/Layouts'
import {
  Box,
  Button,
  Hidden,
  Input,
  Stack,
  Text,
} from '@island.is/island-ui/core'
import { useI18n } from '@island.is/skilavottord-web/i18n'
import { Controller, useForm } from 'react-hook-form'
import { UserContext } from '@island.is/skilavottord-web/context'
import { hasPermission, Role } from '@island.is/skilavottord-web/auth/utils'
import { NotFound } from '@island.is/skilavottord-web/components'

type FormData = {
  registrationNumber: string
}

const Select: FC = () => {
  const { user } = useContext(UserContext)
  const {
    t: {
      deregisterVehicle: { select: t },
      routes: { deregisterVehicle: routes },
    },
  } = useI18n()
  const router = useRouter()
  const { handleSubmit, control, formState, errors } = useForm({
    mode: 'onChange',
  })

  const handleContinue = (formData: FormData) => {
    const registrationNumber = formData.registrationNumber
      .replace(' ', '')
      .replace('-', '')
    router.push(routes.deregister, `${routes.baseRoute}/${registrationNumber}`)
  }

  const handleCancel = () => {
    router.push(routes.baseRoute)
  }

  const validateRegNumber = (value: string) => {
    const regular = new RegExp(/^[A-Z]{1,2}(\s|\-){0,1}([A-Z]|\d){1}\d{2}$/gi)
    const antique = new RegExp(/^[A-Z]{1}\s{0,1}\d{5}$/gi)
    return regular.test(value) || antique.test(value)
  }

  if (!user) {
    return null
  } else if (!hasPermission('deregisterVehicle', user?.role as Role)) {
    return <NotFound />
  }

  return (
    <ProcessPageLayout sectionType={'company'} activeSection={0}>
      <Stack space={4}>
        <Text variant="h1">{t.title}</Text>
        <Text variant="intro">{t.info}</Text>
        <Controller
          control={control}
          name="registrationNumber"
          rules={{
            required: {
              value: true,
              message: t.input.errors.empty,
            },
            minLength: { value: 5, message: t.input.errors.length },
            maxLength: { value: 7, message: t.input.errors.length },
            validate: {
              isValidRegNumber: (value) =>
                validateRegNumber(value) || t.input.errors.invalidRegNumber,
            },
          }}
          defaultValue=""
          render={({ onChange, value, name }) => (
            <Input
              label={t.input.label}
              placeholder={t.input.placeholder}
              name={name}
              value={value?.toUpperCase()}
              onChange={({ target }) => onChange(target.value)}
              hasError={errors.registrationNumber}
              errorMessage={errors.registrationNumber?.message}
            />
          )}
        />
        <Box width="full" display="inlineFlex" justifyContent="spaceBetween">
          <Hidden above="sm">
            <Button
              variant="ghost"
              circle
              size="large"
              icon="arrowBack"
              onClick={handleCancel}
            />
          </Hidden>
          <Hidden below="md">
            <Button variant="ghost" onClick={handleCancel}>
              {t.buttons.cancel}
            </Button>
          </Hidden>
          <Button
            icon="arrowForward"
            disabled={!formState.isValid}
            onClick={handleSubmit(handleContinue)}
          >
            {t.buttons.continue}
          </Button>
        </Box>
      </Stack>
    </ProcessPageLayout>
  )
}

export default Select
