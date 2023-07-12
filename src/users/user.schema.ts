import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', (next: Function) => {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.salt = salt;
      this.password = hash;
      next();
    });
  });
});
