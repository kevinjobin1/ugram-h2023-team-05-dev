import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { WebSocketGateway } from '@nestjs/websockets';
import { NotificationsGateway } from './notifications/api/notifications.gateway';
import { AuthController } from './auth/api/auth.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get config values
  const configService = app.get(ConfigService);
  const clientOrigin: string = configService.get('client.origin');
  const nodeEnv: string = configService.get('env');
  const host: string = configService.get('host');
  const port: number = configService.get('port');
  const jwtExpiresIn: string = configService.get('jwt.expiresIn');
  const jwtIgnoreExpiration: boolean = configService.get('jwt.ignoreExpiration');
  const mongodbUri: string = configService.get('database.uri');
  const googleCallbackURL: string = configService.get('google.callbackURL');

  // Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .addCookieAuth(AuthController.TOKEN_COOKIE_NAME)
    .addOAuth2({
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl: googleCallbackURL,
          scopes: {},
        },
      },
    })
    .setTitle(configService.get('swagger.title'))
    .setDescription(configService.get('swagger.description'))
    .setVersion(configService.get('swagger.version'))
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Setup WebSocket
  decorateNotificationGateway(NotificationsGateway, clientOrigin);

  // Setup global middleware
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(bodyParser.json({ limit: configService.get('bodyParser.limit') }));
  app.use(cookieParser());

  // Setup logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Setup CORS
  app.enableCors({
    origin: clientOrigin,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 200,
  });

  await app.listen(port);

  console.log(
    `\n \n Server running at http://${host}:${port} \n
    Environment = ${nodeEnv.toUpperCase()},
    Client Origin = ${clientOrigin},
    JWT Expires In = '${jwtExpiresIn}',
    JWT Ignore Expiration = ${jwtIgnoreExpiration},
    MongoDB URI = ${mongodbUri},
    Swagger UI = http://${host}:${port}/api \n
Press CTRL-C to stop
    `,
  );
}
bootstrap();

// Decorator to add CORS to a WebSocketGateway using injected environment variables
function decorateNotificationGateway(class_, clientOrigin: string) {
  WebSocketGateway({
    cors: {
      origin: clientOrigin,
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization',
      optionsSuccessStatus: 200,
    },
  })(class_);
}
