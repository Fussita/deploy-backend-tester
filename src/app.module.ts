import { Module } from '@nestjs/common';
import { ProductController } from './product/infraestructure/controller/product.controller';
import { MongooseDataBaseProvider } from '_libs/core';

@Module({
  imports: [],
  controllers: [
    ProductController
  ],
  providers: [
    MongooseDataBaseProvider
  ],
})
export class AppModule {}
