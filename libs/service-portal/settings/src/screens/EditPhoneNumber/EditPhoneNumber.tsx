import {
  AlertMessage,
  Box,
  Button,
  GridColumn,
  GridRow,
  Text,
} from '@island.is/island-ui/core'
import { Link } from 'react-router-dom'
import { useLocale, useNamespaces } from '@island.is/localization'
import {
  ServicePortalModuleComponent,
  ServicePortalPath,
} from '@island.is/service-portal/core'
import {
  useCreateUserProfile,
  useUpdateUserProfile,
  useUserProfile,
} from '@island.is/service-portal/graphql'
import React, { useEffect, useState } from 'react'
import { PhoneForm } from '../../components/Forms/PhoneForm/PhoneForm'
import { defineMessage } from 'react-intl'

interface PhoneFormData {
  tel: string
}

export const EditPhoneNumber: ServicePortalModuleComponent = ({ userInfo }) => {
  useNamespaces('sp.settings')
  const [tel, setTel] = useState('')
  const { data: userProfile } = useUserProfile()
  const [status, setStatus] = useState<'passive' | 'success' | 'error'>(
    'passive',
  )
  const { formatMessage } = useLocale()
  const { createUserProfile } = useCreateUserProfile()
  const { updateUserProfile } = useUpdateUserProfile()

  useEffect(() => {
    if (!userProfile) return
    if (userProfile.mobilePhoneNumber.length > 0)
      setTel(userProfile.mobilePhoneNumber)
  }, [userProfile])

  const submitFormData = async (formData: PhoneFormData) => {
    if (status !== 'passive') setStatus('passive')

    try {
      // Update the profile if it exists, otherwise create one
      if (userProfile) {
        await updateUserProfile({
          mobilePhoneNumber: formData.tel,
        })
      } else {
        await createUserProfile({
          mobilePhoneNumber: formData.tel,
        })
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  const handleSubmit = (data: PhoneFormData) => {
    submitFormData(data)
  }

  return (
    <>
      <Box marginBottom={4}>
        <Text variant="h1">
          {formatMessage({
            id: 'sp.settings:edit-phone-number',
            defaultMessage: 'Breyta símanúmeri',
          })}
        </Text>
      </Box>
      <Box marginBottom={5}>
        <GridRow>
          <GridColumn span={['1/1', '6/8']}>
            <Text>
              {formatMessage({
                id: 'sp.settings:edit-phone-number-description',
                defaultMessage: `
                  Hér getur þú gert breytingar á þínu símanúmeri.
                  Ath. símanúmerið er notað til þess að senda þér
                  upplýsingar í SMS og ná í þig símleiðis ef þörf krefur.
                `,
              })}
            </Text>
          </GridColumn>
        </GridRow>
      </Box>
      <PhoneForm
        tel={tel}
        natReg={userInfo.profile.nationalId}
        renderBackButton={() => (
          <Link to={ServicePortalPath.UserProfileRoot}>
            <Button variant="ghost">
              {formatMessage({
                id: 'service.portal:go-back',
                defaultMessage: 'Til baka',
              })}
            </Button>
          </Link>
        )}
        submitButtonText={defineMessage({
          id: 'sp.settings:save-changes',
          defaultMessage: 'Vista breytingar',
        })}
        onSubmit={handleSubmit}
      />
      {status !== 'passive' && (
        <Box marginTop={[5, 7, 15]}>
          {status === 'success' && (
            <AlertMessage
              type="success"
              title={formatMessage({
                id: 'sp.settings:phone-confirmed-success-title',
                defaultMessage: 'Nýtt símanúmer hefur verið vistað',
              })}
              message={formatMessage({
                id: 'sp.settings:phone-confirmed-success-subtext',
                defaultMessage:
                  'Þú hefur vistað nýtt símanúmer hjá Stafrænt Ísland',
              })}
            />
          )}
          {status === 'error' && (
            <AlertMessage
              type="error"
              title={formatMessage({
                id: 'sp.settings:phone-confirmed-failed-title',
                defaultMessage: 'Tókst ekki að vista símanúmer',
              })}
              message={formatMessage({
                id: 'sp.settings:phone-confirmed-failed-subtext',
                defaultMessage:
                  'Eitthvað hefur farið úrskeiðis, vinsamlegast reynið aftur síðar',
              })}
            />
          )}
        </Box>
      )}
    </>
  )
}

export default EditPhoneNumber
