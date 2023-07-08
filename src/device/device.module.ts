import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from './device.schema';
import { DeviceController } from './device.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }])],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
