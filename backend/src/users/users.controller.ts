import { Controller, Get, Post, Delete, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const userObject = JSON.parse(JSON.stringify(user));
    const { password, ...result } = userObject;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user.favoriteProducts;
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites/:productId')
  async addFavorite(@Request() req, @Param('productId') productId: string) {
    const updatedUser = await this.usersService.addFavoriteProduct(req.user.userId, productId);
    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return {
      message: 'Producto agregado a favoritos',
      favoriteProducts: updatedUser.favoriteProducts
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites/:productId')
  async removeFavorite(@Request() req, @Param('productId') productId: string) {
    const updatedUser = await this.usersService.removeFavoriteProduct(req.user.userId, productId);
    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return {
      message: 'Producto removido de favoritos',
      favoriteProducts: updatedUser.favoriteProducts
    };
  }
}
