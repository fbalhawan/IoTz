import { Injectable } from '@nestjs/common';
import { Device } from './device.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import { DeviceDto } from 'src/dto';
import * as moment from 'moment';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel('Device')
    private deviceModel: Model<Device>,
  ) {}

  /**
   * Get list of devices
   * @param filters
   * @param pageNumber
   * @param pageSize
   * @returns
   */
  async searchDevices(filters: any, pageNumber: number, pageSize: number) {
    const totalCount = await this.deviceModel.countDocuments(filters);
    const totalPages = Math.ceil(totalCount / pageSize);
    const devices = await this.deviceModel
      .find(filters)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return {
      devices,
      pageNumber,
      totalPages,
    };
  }

  async createDevice(dto: DeviceDto) {
    const { deviceId, alias } = dto;
    const _deviceId = deviceId ?? randomUUID();

    const device = new this.deviceModel({
      deviceId: _deviceId,
      alias,
    });
    const savedDevice = await device.save();

    return savedDevice;
  }

  // TODO: implement device deletion
  async deleteDevices(filters: any) {
    return 'device deleted';
  }
}
