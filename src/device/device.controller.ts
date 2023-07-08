import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DeviceService } from './device.service';
import { DeviceDto } from 'src/dto';
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async getDevices(@Req() req: Request, @Res() res: Response) {
    const { pageNumber, pageSize, filters = {} } = req.body;
    const devices = await this.deviceService.searchDevices(filters, pageNumber, pageSize);
    return res.status(HttpStatus.OK).json(devices);
  }

  @Get(':id')
  async getDevice(@Param('id') id: string, @Res() res: Response) {
    const devices = await this.deviceService.searchDevices(
      {
        deviceId: id,
      },
      1,
      1,
    );
    const device = devices.devices[0];
    if (!device) {
      res.status(HttpStatus.NOT_FOUND).send('Device not found');
    }
    res.json(device);
  }

  @Post()
  async postDevice(@Body() dto: DeviceDto) {
    const errors = [];
    try {
      const device = await this.deviceService.createDevice(dto);
      return device;
    } catch (error) {
      console.error(error);
      errors.push(error);
      throw new InternalServerErrorException(errors);
    }
  }
}
