import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './device/device.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_NAME = process.env.MONGO_NAME;
@Module({
  imports: [
    MongooseModule.forRoot(`${MONGO_HOST}/${MONGO_NAME}`, {
      connectionFactory: (connection: Connection) => {
        connection.on('connected', () => {
          Logger.log(`Connected to DB: ${MONGO_HOST}/${MONGO_NAME}`, 'MONGO');
        });
        connection.on('disconnected', () => {
          Logger.log(`Disconnected from DB: ${MONGO_HOST}/${MONGO_NAME}`, 'MONGO');
        });
        connection.on('error', (error) => {
          Logger.error(`Failed to connect to DB: ${error}`, 'MONGO');
        });
        
        return connection;
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DeviceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
