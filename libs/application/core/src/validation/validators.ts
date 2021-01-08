import { Schema } from '../types/Form'
import { Answer, FormValue } from '../types/Application'
import { ZodError, ZodErrorCode, ZodErrorMap } from 'zod'

interface SchemaValidationError {
  [key: string]: string
}

function populateError(
  currentError: SchemaValidationError | undefined,
  newError: ZodError | undefined,
  pathToError: string,
): SchemaValidationError | undefined {
  if (newError === undefined) {
    return currentError
  }

  if (!currentError) {
    return { [pathToError]: newError.errors[0].message }
  }

  return { ...currentError, [pathToError]: newError.errors[0].message }
}

function constructPath(currentPath: string, newKey: string) {
  if (currentPath === '') {
    return newKey
  }
  return `${currentPath}.${newKey}`
}

function partialSchemaValidation(
  answers: FormValue,
  originalSchema: Schema,
  error: SchemaValidationError | undefined,
  isStrict?: boolean,
  currentPath = '',
): SchemaValidationError | undefined {
  Object.keys(answers).forEach((key) => {
    const newPath = constructPath(currentPath, key)
    const answer = answers[key]
    console.log('-answer', answer)

    // ZodUnions do not have .pick method
    const trimmedSchema = originalSchema.pick
      ? originalSchema.pick({ [key]: true })
      : originalSchema

    /**
     * TODO: add .parse to enum for default error message
     */

    if (typeof answer === 'object') {
      if (answer.length) {
        // answer is array
        const arrayElements = answer as Answer[]
        console.log('-arrayElements', arrayElements)

        arrayElements.forEach((el, index) => {
          const elementPath = `${newPath}[${index}]`
          console.log('-elementPath', elementPath)

          if (typeof el === 'object') {
            if (!isStrict && el !== null) {
              console.log('-el', el)
              console.log('-trimmedSchema', trimmedSchema)
              // console.log('-error', error)
              console.log('-isStrict', isStrict)

              error = partialSchemaValidation(
                el as FormValue,
                trimmedSchema?.shape[key]?._def?.type,
                error,
                isStrict,
                elementPath,
              )

              console.log('-error 1', error)
            }
          } else {
            try {
              trimmedSchema.parse({ [key]: [el] })
            } catch (e) {
              error = populateError(error, e, elementPath)
            }
          }
        })
      } else {
        // answer is normal object
        error = partialSchemaValidation(
          answer as FormValue,
          originalSchema.shape[key],
          error,
          isStrict,
          newPath,
        )

        console.log('-error 2', error)
      }
    } else {
      // answer is primitive
      try {
        trimmedSchema.parse({ [key]: answer })
      } catch (e) {
        error = populateError(error, e, newPath)
      }
    }
  })

  return error
}

export function validateAnswers(
  dataSchema: Schema,
  answers: FormValue,
  isFullSchemaValidation?: boolean,
): SchemaValidationError | undefined {
  if (!isFullSchemaValidation) {
    const res = partialSchemaValidation(
      answers,
      dataSchema,
      undefined,
      false,
      '',
    )
    console.log('-res', res)

    return res
  }

  try {
    dataSchema.parse(answers)
  } catch (e) {
    return e
  }

  return undefined
}
