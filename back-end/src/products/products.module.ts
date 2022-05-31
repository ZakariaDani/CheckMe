import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ConnectionModule } from 'src/connection/connection.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConnectionModule,
    ConfigModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
