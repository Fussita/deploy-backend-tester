import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';

async function bootstrap() {
  console.log(envs)
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(envs.port ?? 3000);
}
bootstrap();

//docker run -dp 80:4000 -e PORT=4000 deploy-backend-tester-products-backend:latest