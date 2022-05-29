import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  let authService: AuthService;  
  //authService.registerUser(registerDto);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:4200'],
  });
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(config.get('APP_PORT'), config.get('APP_HOST'));
}
bootstrap();
