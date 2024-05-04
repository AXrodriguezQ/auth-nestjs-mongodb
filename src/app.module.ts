import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { LoginModule } from './modules/login/login.module';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env',
    load: [dbConfig],
    isGlobal: true,
  }),
  PersistenceModule,
  UsersModule,
  LoginModule
],
})
export class AppModule {}
