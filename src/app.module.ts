import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
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
