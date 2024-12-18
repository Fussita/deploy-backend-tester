import { Module } from '@nestjs/common';
import { ProductController } from './product/infraestructure/controller/product.controller';
import { MongooseDataBaseProvider } from '_libs/core';
import { AuthController } from './auth/infraestructure/controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: 'secret-token-jwt',
      signOptions: { expiresIn: '168h' }
    }),
  ],
  controllers: [
    ProductController,
    AuthController
  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
