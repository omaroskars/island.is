import { FC, useEffect } from 'react'
import { FormItemTypes, FormValue } from '@island.is/application/schema'
import { useWatch } from 'react-hook-form'
import { FieldDef, FormScreen } from '../types'
import { applyConditionsToFormField } from '../reducer/reducerUtils'

// Use this component to optimize performance for applying conditions in response to form value changes
export const ConditionHandler: FC<{
  answerQuestions(Answers): void
  formValue: FormValue
  screen: FormScreen
}> = ({ answerQuestions, formValue, screen }) => {
  const data = useWatch({ defaultValue: formValue })
  useEffect(() => {
    const newScreen = applyConditionsToFormField(screen, {
      ...formValue,
      ...data,
    })
    let hasUpdated = false
    if (screen.isVisible !== newScreen.isVisible) {
      answerQuestions(data)
      hasUpdated = true
    }

    if (screen.type === FormItemTypes.MULTI_FIELD && !hasUpdated) {
      screen.children.forEach((child: FieldDef, index) => {
        if (child.isVisible !== newScreen.children[index].isVisible) {
          answerQuestions(data)
          return false
        }
      })
    }
  }, [answerQuestions, data, formValue, screen])
  return null
}

export default ConditionHandler
