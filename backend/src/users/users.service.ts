import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findOne(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
  
  async create(email: string, password: string): Promise<User> {
    const existingUser = await this.findOne(email);
    
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      favoriteProducts: [],
    });
    
    return newUser.save();
  }

  async addFavoriteProduct(userId: string, productId: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(userId).exec();
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const exists = user.favoriteProducts.includes(productId);
    
    if (!exists) {
      user.favoriteProducts.push(productId);
      await user.save();
    }
    
    return this.userModel.findById(userId).exec();
  }

  async removeFavoriteProduct(userId: string, productId: string): Promise<UserDocument | null> {
    const updated = await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { favoriteProducts: productId } },
      { new: true }
    ).exec();
    
    if (!updated) {
      throw new NotFoundException('Usuario no encontrado');
    }
    
    return updated;
  }
}