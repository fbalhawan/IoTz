import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService],
})
export class UsersModule {}
