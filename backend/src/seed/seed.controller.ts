import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('products')
  async seedProducts() {
    await this.seedService.seedProducts();
    return { message: 'Products seeded successfully' };
  }
}
