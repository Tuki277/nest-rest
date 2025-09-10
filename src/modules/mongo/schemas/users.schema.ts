import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EAppRoles } from 'src/common/enum';

@Schema()
export class Users extends Document {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  passwordSalt: string;

  @Prop({ type: String, required: false, name: 'first_name' })
  firstName: string;

  @Prop({ type: String, required: false, name: 'last_name' })
  lastName: string;

  @Prop({ type: Number, required: false })
  age: number;

  @Prop({
    type: Boolean,
    default: false,
    name: 'is_active',
  })
  isActive: boolean;

  @Prop({
    required: true,
    type: Array,
    enum: EAppRoles,
  })
  roles?: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
