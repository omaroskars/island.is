import {
  providerToString,
  Provider,
  Service,
  OpenApi,
  XroadIdentifier,
} from '@island.is/api-catalogue/types'
import { Injectable } from '@nestjs/common'
import { RestMetaservicesApi } from '../../gen/fetch/xrd-rest'
import { logger } from '@island.is/logging'
import YamlParser from 'js-yaml'
import union from 'lodash/union'
import {
  AccessCategory,
  DataCategory,
  PricingCategory,
  ProviderType,
  TypeCategory,
} from '@island.is/api-catalogue/consts'
import { serviceIdSort, exceptionHandler } from './utils'
import { uuid } from 'uuidv4'

@Injectable()
export class RestMetadataService {
  constructor(private readonly xrdRestMetaservice: RestMetaservicesApi) {}

  /**
   * Gets list of all REST services with an OpenAPI document
   * from an Service Provider (X-Road Subsystem)
   * @param provider
   */
  async getServices(provider: Provider): Promise<Array<Service>> {
    logger.info(`Getting services for ${providerToString(provider)}`)
    const services: Array<Service> = []
    const serviceMap = await this.getServiceCodes(provider)

    for (const [_, value] of serviceMap) {
      const sorted = value.sort(serviceIdSort)

      const service: Service = {
        id: uuid().split('-').join(''),
        name: '',
        owner: '',
        description: '',
        pricing: [],
        data: [],
        access: [AccessCategory.XROAD],
        type: [TypeCategory.REST],
        xroadIdentifier: [],
      }

      if (provider.type === ProviderType.PUBLIC) {
        service.access.push(AccessCategory.APIGW)
      }

      // Get the OpenApi for each service to aggregate info
      for (let i = 0; i < sorted.length; i++) {
        const spec = await this.getOpenApi(sorted[i])

        if (spec && this.validateSpec(spec)) {
          // The list is sorted for the latest service version to be the last element
          // so name, owner and description will be from the latest version.
          service.name = spec.info.title
          service.owner =
            spec.info.contact?.name || provider.xroadInfo.subsystemCode // ToDo: Maybe update to use provider.memberCode to look up the name
          service.description = spec.info.description ?? ''
          service.data = union(service.data, spec.info['x-category'])
          service.pricing = union(service.pricing, spec.info['x-pricing'])
          service.xroadIdentifier.push(sorted[i])
        } else {
          logger.error(
            `OpenAPI not found or is invalid for service code ${sorted[i].memberCode}/${sorted[i].subsystemCode}/${sorted[i].serviceCode}`,
          )
        }
      }

      if (service.name) services.push(service)
    }

    logger.info(
      `Found ${services.length} services for ${providerToString(provider)}`,
    )

    return services
  }

  /**
   * Gets service OpenAPI from X-Road.
   * @param xroadIdentifier Object identifying the service in X-Road
   * @returns OpenAPI object if spec is found, otherwise null
   */
  async getOpenApi(
    xroadIdentifier: XroadIdentifier,
  ): Promise<OpenApi | undefined> {
    return YamlParser.safeLoad(
      await this.getOpenApiString(xroadIdentifier),
    ) as OpenApi
  }

  /**
   * Returns the OpenApi YAML or JSON string from X-Road environment
   * @param xroadIdentifier
   */
  async getOpenApiString(xroadIdentifier: XroadIdentifier): Promise<string> {
    try {
      // We have this in a try/catch as REST services can be manually
      // registered in X-Road, meaning they won't have an OpenAPI which
      // causes X-Road to return Internal Server Error causing exception.
      // This can be fixed using the REST AdminAPI to check the REST type
      // of the service before calling this.
      return await this.xrdRestMetaservice.getOpenAPI({
        xRoadInstance: xroadIdentifier.instance,
        memberClass: xroadIdentifier.memberClass,
        memberCode: xroadIdentifier.memberCode,
        subsystemCode: xroadIdentifier.subsystemCode,
        serviceCode: xroadIdentifier.serviceCode,
      })
    } catch (err) {
      exceptionHandler(err)
    }

    return ''
  }

  private async getServiceCodes(
    provider: Provider,
  ): Promise<Map<string, Array<XroadIdentifier>>> {
    const serviceMap = new Map<string, Array<XroadIdentifier>>()
    const xrdServices = await this.xrdRestMetaservice.listMethods({
      xRoadInstance: provider.xroadInfo.instance,
      memberClass: provider.xroadInfo.memberClass,
      memberCode: provider.xroadInfo.memberCode,
      subsystemCode: provider.xroadInfo.subsystemCode,
    })

    logger.debug(
      `Found ${
        xrdServices?.service?.length
      } service codes for ${providerToString(provider)}`,
    )

    xrdServices?.service?.forEach((item) => {
      // Validate the properties are provided that we need
      if (
        item &&
        item.serviceCode &&
        item.xroadInstance &&
        item.memberCode &&
        item.memberClass &&
        item.subsystemCode
      ) {
        const serviceCode = item.serviceCode.split('-')[0]
        const mappedItem: XroadIdentifier = {
          instance: item.xroadInstance,
          memberClass: item.memberClass,
          memberCode: item.memberCode,
          subsystemCode: item.subsystemCode,
          serviceCode: item.serviceCode,
        }

        const map = serviceMap.get(serviceCode)

        if (map) {
          map.push(mappedItem)
        } else {
          serviceMap.set(serviceCode, [mappedItem])
        }
      }
    })

    return serviceMap
  }

  private validateSpec(spec: OpenApi): boolean {
    if (!spec.info.title) {
      logger.error('OpenApi Specification is missing info.title')
      return false
    }

    if (spec.info['x-category']) {
      // Softer check for the moment while testing in dev with fewer
      // services registered with correct form of the OpenApi
      // Should be updated to validate that 'x-category' is
      // required and contains only valid values
      for (const item of spec.info['x-category']) {
        if (!Object.values(DataCategory).includes(item as DataCategory)) {
          logger.error(`${item} is not valid value for DataCategory`)
          return false
        }
      }
    }

    if (spec.info['x-pricing']) {
      // Softer check for the moment while testing in dev with fewer
      // services registered with correct form of the OpenApi
      // Should be updated to validate that 'x-pricing' is
      // required and contains only valid values
      for (const item of spec.info['x-pricing']) {
        if (!Object.values(PricingCategory).includes(item as PricingCategory)) {
          logger.error(`${item} is not valid value for PricingCategory`)
          return false
        }
      }
    }

    return true
  }
}
