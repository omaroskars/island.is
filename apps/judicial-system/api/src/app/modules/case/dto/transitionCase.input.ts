import { Allow } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

import {
  CaseTransition,
  TransitionCase,
} from '@island.is/judicial-system/types'

@InputType()
export class TransitionCaseInput implements TransitionCase {
  @Allow()
  @Field()
  readonly id!: string

  @Allow()
  @Field()
  readonly modified!: string

  @Allow()
  @Field(() => String)
  readonly transition!: CaseTransition
}
