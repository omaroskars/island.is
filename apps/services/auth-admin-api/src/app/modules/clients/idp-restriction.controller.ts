import {
  ClientsService,
  ClientIdpRestrictions,
  ClientIdpRestrictionDTO,
} from '@island.is/auth-api-lib'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOAuth2, ApiTags } from '@nestjs/swagger'
import { IdsAuthGuard } from '@island.is/auth-nest-tools'
import { NationalIdGuard } from '../access/national-id-guard'

// @ApiOAuth2(['@identityserver.api/read'])
@UseGuards(IdsAuthGuard, NationalIdGuard)
@ApiTags('idp-restriction')
@Controller('idp-restriction')
export class IdpRestrictionController {
  constructor(private readonly clientsService: ClientsService) {}

  /** Adds new IDP restriction */
  @Post()
  @ApiCreatedResponse({ type: ClientIdpRestrictions })
  async create(
    @Body() restriction: ClientIdpRestrictionDTO,
  ): Promise<ClientIdpRestrictions> {
    return await this.clientsService.addIdpRestriction(restriction)
  }

  /** Removes a idp restriction */
  @Delete(':clientId/:name')
  @ApiCreatedResponse()
  async delete(
    @Param('clientId') clientId: string,
    @Param('name') name: string,
  ): Promise<number> {
    if (!clientId || !name) {
      throw new BadRequestException('clientId and name must be provided')
    }

    return await this.clientsService.removeIdpRestriction(clientId, name)
  }
}
