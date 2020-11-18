import { Allow } from 'class-validator'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SignatureConfirmationQueryInput {
  @Allow()
  @Field()
  readonly caseId!: string

  @Allow()
  @Field()
  documentToken!: string
}
