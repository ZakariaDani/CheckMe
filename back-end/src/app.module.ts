import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConnectionModule } from './connection/connection.module';
import { ProductsModule } from './products/products.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'DaniKakashi2015',
  database: 'checkme',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(ormOptions),
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
    }),
    ConnectionModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
