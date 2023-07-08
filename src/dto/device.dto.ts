import { IsNotEmpty, IsString } from 'class-validator';
export class DeviceDto {
  @IsString()
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  alias: string;
}
