import mongoose from 'mongoose';

export interface UserRole extends mongoose.Document {
  value: {
    type: string;
    unique: boolean;
    default: string;
  }
}

export interface UserData extends mongoose.Document {
  username: {type: String, unique: true, required: true},
  lastname: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  photoUrl: {type: String},
  roles: [{type: String, ref: UserRole}],
}

export interface Roles {
  type: String;
  ref: UserRole;
}
