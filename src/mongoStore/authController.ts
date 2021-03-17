import mongoose from 'mongoose';
import User from '../models/User';
import Role from '../models/Role';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import secret from './config';
import { UserRole, UserData, Roles } from '../interface';
const bcrypt = require('bcryptjs');

const generateAccessToken = (id: string, roles: Roles[]): string => {
  const payload = {
    id,
    roles
  };

  return jwt.sign(payload, secret.secret, { expiresIn: '24' });
};

class AuthController {

  async registration(req, res) {
    await mongoose.connect('mongodb+srv://admin:qwerty123@cluster0.zasbp.mongodb.net/travel-app?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, });

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Registration error', 
          errors
        });
      }

      const { username, password, lastname, email } = req.body;

      const candidate = await User.findOne({username});

      if (candidate) {
        return res.status(400).json({
          message: 'User already exists with the same name'
        });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const userRole = await Role.findOne({value: 'USER'});
      const user = new User({
        username, 
        lastname, 
        email, 
        password: hashPassword, 
        roles: [(userRole as UserRole).value]
      });

      await user.save();

      return res.status(200).json({message: 'User was created successfully'});
    } catch (err) {
      console.error(err);
      res.status(400).json({message: 'Registration error'});
    }
  }

  async login(req, res) {
    await mongoose.connect('mongodb+srv://admin:qwerty123@cluster0.zasbp.mongodb.net/travel-app?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, });

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({message: `User ${email} not found`});
    }

    const validPassword = bcrypt.compareSync(password, (user as UserData).password);

    if (!validPassword) {
      return res.status(400).json({message: `Incorrect password entered`});
    }

    const token = generateAccessToken(user._id, (user as UserData).roles);

    const { username, lastname, photoUrl } = user as UserData;

    return res.json({ token, username, lastname, photoUrl, email });
  }  catch (err) {
    console.error(err);
    res.status(400).json({message: 'Login error'});
  }   
  }

  async getUsers(req, res) {
    await mongoose.connect('mongodb+srv://admin:qwerty123@cluster0.zasbp.mongodb.net/travel-app?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, });

    const users = await User.find();

    res.json(users);
    try {

    } catch (err) {

    }
  }
}

export default new AuthController();
