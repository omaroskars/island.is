import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TerminusModule } from '@nestjs/terminus'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import { ContentSearchModule } from '@island.is/api/domains/content-search'
import { CmsModule } from '@island.is/api/domains/cms'
import { DrivingLicenseModule } from '@island.is/api/domains/driving-license'
import { ApplicationModule } from '@island.is/api/domains/application'
import { DirectorateOfLabourModule } from '@island.is/api/domains/directorate-of-labour'
import { FileUploadModule } from '@island.is/api/domains/file-upload'
import { DocumentModule } from '@island.is/api/domains/documents'
import { CommunicationsModule } from '@island.is/api/domains/communications'
import { TranslationsModule } from '@island.is/api/domains/translations'
import { UserProfileModule } from '@island.is/api/domains/user-profile'
import { NationalRegistryModule } from '@island.is/api/domains/national-registry'
import { HealthTestModule } from '@island.is/api/domains/health-insurance'
import { AuthModule } from '@island.is/auth-nest-tools'
import { HealthController } from './health.controller'
import { environment } from './environments'
import { ApiCatalogueModule } from '@island.is/api/domains/api-catalogue'
import { DocumentProviderModule } from '@island.is/api/domains/document-provider'

const debug = process.env.NODE_ENV === 'development'
const playground = debug || process.env.GQL_PLAYGROUND_ENABLED === 'true'
const autoSchemaFile = environment.production
  ? true
  : 'apps/api/src/api.graphql'

@Module({
  controllers: [HealthController],
  imports: [
    GraphQLModule.forRoot({
      debug,
      playground,
      autoSchemaFile,
      path: '/api/graphql',
      plugins: [
        responseCachePlugin({
          shouldReadFromCache: ({
            request: {
              http: { headers },
            },
          }) => {
            const bypassCacheKey = headers.get('bypass-cache-key')
            return bypassCacheKey !== process.env.BYPASS_CACHE_KEY
          },
        }),
      ],
    }),
    ContentSearchModule,
    CmsModule,
    DrivingLicenseModule.register({
      baseApiUrl: environment.drivingLicense.baseApiUrl,
      secret: environment.drivingLicense.secret,
    }),
    ApplicationModule.register({
      baseApiUrl: environment.applicationSystem.baseApiUrl,
    }),
    DirectorateOfLabourModule.register(),
    FileUploadModule,
    DocumentModule.register({
      basePath: environment.documentService.basePath,
      clientId: environment.documentService.clientId,
      clientSecret: environment.documentService.clientSecret,
      tokenUrl: environment.documentService.tokenUrl,
    }),
    DocumentProviderModule.register({
      test: {
        basePath: environment.documentProviderService.test.basePath,
        clientId: environment.documentProviderService.test.clientId,
        clientSecret: environment.documentProviderService.test.clientSecret,
        tokenUrl: environment.documentProviderService.test.tokenUrl,
      },
      prod: {
        basePath: environment.documentProviderService.prod.basePath,
        clientId: environment.documentProviderService.prod.clientId,
        clientSecret: environment.documentProviderService.prod.clientSecret,
        tokenUrl: environment.documentProviderService.prod.tokenUrl,
      },
    }),
    TranslationsModule,
    TerminusModule,
    NationalRegistryModule.register({
      baseSoapUrl: environment.nationalRegistry.baseSoapUrl,
      user: environment.nationalRegistry.user,
      password: environment.nationalRegistry.password,
      host: environment.nationalRegistry.host,
    }),
    HealthTestModule.register(),
    UserProfileModule.register({
      userProfileServiceBasePath:
        environment.userProfile.userProfileServiceBasePath,
    }),
    CommunicationsModule,
    ApiCatalogueModule,
    AuthModule.register({
      audience: environment.identityServer.audience,
      issuer: environment.identityServer.issuer,
      jwksUri: `${environment.identityServer.jwksUri}`,
    }),
  ],
})
export class AppModule {}
