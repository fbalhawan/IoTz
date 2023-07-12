import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true, unique: true })
  deviceId: string;

  @Prop({ required: true })
  alias: string;

  @Prop({ default: null })
  location: string;

  @Prop({ default: null })
  ping: Date;

  @Prop({ enum: ['active', 'inactive', 'maintenance'] })
  status: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
