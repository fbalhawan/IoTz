import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async findOne(dto: LoginDto) {
    const user = await this.userModel.findOne({
      email: dto.email,
    });
    return user;
  }
}
