import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    
    if (user && await bcrypt.compare(pass, user.password)) {
      const userObject = JSON.parse(JSON.stringify(user));
      const { password, ...result } = userObject;
      return { ...result, id: userObject._id };
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email
      }
    };
  }

  async register(email: string, password: string) {
    const user = await this.usersService.create(email, password);
    const userObject = JSON.parse(JSON.stringify(user));
    return {
      id: userObject._id,
      email: userObject.email
    };
  }
}