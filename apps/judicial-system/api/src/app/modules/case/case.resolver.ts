import {
  Query,
  Resolver,
  Context,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { Inject, UseGuards } from '@nestjs/common'

import { Logger, LOGGER_PROVIDER } from '@island.is/logging'

import { AuthUser, CurrentAuthUser, JwtAuthGuard } from '../auth'
import {
  CreateCaseInput,
  UpdateCaseInput,
  TransitionCaseInput,
  SendNotificationInput,
  RequestSignatureInput,
  SignatureConfirmationQueryInput,
  CaseQueryInput,
} from './dto'
import {
  Case,
  Notification,
  RequestSignatureResponse,
  SendNotificationResponse,
  SignatureConfirmationResponse,
} from './models'
import { BackendAPI } from '../../../services'

@UseGuards(JwtAuthGuard)
@Resolver(() => Case)
export class CaseResolver {
  constructor(
    @Inject(LOGGER_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @Query(() => [Case], { nullable: true })
  cases(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case[]> {
    this.logger.debug('Getting all cases')

    return backendApi.getCases()
  }

  @Query(() => Case, { nullable: true })
  case(
    @Args('input', { type: () => CaseQueryInput })
    input: CaseQueryInput,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case> {
    this.logger.debug(`Getting case ${input.id}`)

    return backendApi.getCase(input.id)
  }

  @Mutation(() => Case, { nullable: true })
  createCase(
    @Args('input', { type: () => CreateCaseInput })
    input: CreateCaseInput,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case> {
    this.logger.debug('Creating case')

    return backendApi.createCase(input)
  }

  @Mutation(() => Case, { nullable: true })
  updateCase(
    @Args('input', { type: () => UpdateCaseInput })
    input: UpdateCaseInput,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case> {
    const { id, ...updateCase } = input

    this.logger.debug(`Updating case ${id}`)

    return backendApi.updateCase(id, updateCase)
  }

  @Mutation(() => Case, { nullable: true })
  transitionCase(
    @Args('input', { type: () => TransitionCaseInput })
    input: TransitionCaseInput,
    @CurrentAuthUser() authUser: AuthUser,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Case> {
    const { id, ...transitionCase } = input

    this.logger.debug(`Transitioning case ${id}`)

    return backendApi.transitionCase(id, authUser.nationalId, transitionCase)
  }

  @Mutation(() => SendNotificationResponse, { nullable: true })
  sendNotification(
    @Args('input', { type: () => SendNotificationInput })
    input: SendNotificationInput,
    @CurrentAuthUser() authUser: AuthUser,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<SendNotificationResponse> {
    const { caseId, ...sendNotification } = input

    this.logger.debug(`Sending notification for case ${caseId}`)

    return backendApi.sendNotification(
      caseId,
      authUser.nationalId,
      sendNotification,
    )
  }

  @Mutation(() => RequestSignatureResponse, { nullable: true })
  requestSignature(
    @Args('input', { type: () => RequestSignatureInput })
    input: RequestSignatureInput,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<RequestSignatureResponse> {
    this.logger.debug(`Requesting signature of ruling for case ${input.caseId}`)

    return backendApi.requestSignature(input.caseId)
  }

  @Query(() => SignatureConfirmationResponse, { nullable: true })
  signatureConfirmation(
    @Args('input', { type: () => SignatureConfirmationQueryInput })
    input: SignatureConfirmationQueryInput,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<SignatureConfirmationResponse> {
    const { caseId, documentToken } = input

    this.logger.debug(`Confirming signature of ruling for case ${caseId}`)

    return backendApi.getSignatureConfirmation(caseId, documentToken)
  }

  @ResolveField(() => [Notification])
  async notifications(
    @Parent() existingCase: Case,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<Notification[]> {
    const { id } = existingCase

    return backendApi.getCaseNotifications(id)
  }
}
