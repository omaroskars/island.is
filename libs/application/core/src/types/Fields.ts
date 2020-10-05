import { FormItem } from './Form'
import { Condition } from './Condition'
import { CallToAction } from './StateMachine'

import { MessageDescriptor } from 'react-intl'
export interface Option {
  value: string
  label: MessageDescriptor | string
  tooltip?: MessageDescriptor | string
  excludeOthers?: boolean
}
export type FieldWidth = 'full' | 'half'

export interface BaseField extends FormItem {
  readonly id: string
  readonly component: FieldComponents | string
  readonly name: MessageDescriptor | string
  readonly children: undefined
  width?: FieldWidth
  condition?: Condition
  repeaterIndex?: number
  // TODO use something like this for non-schema validation?
  // validate?: (formValue: FormValue, context?: object) => boolean
}

export enum FieldTypes {
  CHECKBOX = 'CHECKBOX',
  CUSTOM = 'CUSTOM',
  DATE = 'DATE',
  INTRO = 'INTRO',
  RADIO = 'RADIO',
  EMAIL = 'EMAIL',
  SELECT = 'SELECT',
  TEXT = 'TEXT',
  FILEUPLOAD = 'FILEUPLOAD',
  REVIEW = 'REVIEW',
  DIVIDER = 'DIVIDER',
}

export enum FieldComponents {
  CHECKBOX = 'CheckboxFormField',
  TEXT = 'TextFormField',
  INTRO = 'IntroductionFormField',
  RADIO = 'RadioFormField',
  SELECT = 'SelectFormField',
  FILEUPLOAD = 'FileUploadFormField',
  DIVIDER = 'DividerFormField',
  REVIEW = 'ReviewFormField',
}

export interface Question extends BaseField {
  required?: boolean
  disabled?: boolean
}

export interface CheckboxField extends Question {
  readonly type: FieldTypes.CHECKBOX
  component: FieldComponents.CHECKBOX
  options: Option[]
}

export interface DateField extends Question {
  readonly type: FieldTypes.DATE
  component: FieldComponents.TEXT // TODO needs a component
  maxDate?: Date
  minDate?: Date
}

export interface IntroductionField extends BaseField {
  readonly type: FieldTypes.INTRO
  component: FieldComponents.INTRO
  readonly introduction: MessageDescriptor | string
}

export interface RadioField extends Question {
  readonly type: FieldTypes.RADIO
  component: FieldComponents.RADIO
  options: Option[]
}

export interface SelectField extends Question {
  readonly type: FieldTypes.SELECT
  component: FieldComponents.SELECT
  options: Option[]
  placeholder?: string
}

export interface TextField extends Question {
  readonly type: FieldTypes.TEXT
  component: FieldComponents.TEXT
  disabled?: boolean
  minLength?: number
  maxLength?: number
  placeholder?: string
}

export interface FileUploadField extends Question {
  readonly type: FieldTypes.FILEUPLOAD
  component: FieldComponents.FILEUPLOAD
  readonly introduction: MessageDescriptor | string
  readonly uploadHeader?: string
  readonly uploadDescription?: string
  readonly uploadButtonLabel?: string
  readonly uploadMultiple?: boolean
  readonly uploadAccept?: string
}

export interface ReviewField extends BaseField {
  readonly type: FieldTypes.REVIEW
  component: FieldComponents.REVIEW
  readonly actions: CallToAction[]
}

export interface DividerField extends BaseField {
  readonly type: FieldTypes.DIVIDER
  component: FieldComponents.DIVIDER
}

export interface CustomField extends Question {
  readonly type: FieldTypes.CUSTOM
  readonly component: string
  props?: object
}

export type Field =
  | CheckboxField
  | CustomField
  | DateField
  | IntroductionField
  | RadioField
  | SelectField
  | TextField
  | FileUploadField
  | DividerField
  | ReviewField