import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('DATABASE_URL') || 
                   configService.get<string>('MONGODB_URI') || 
                   'mongodb://localhost:27017/property_db';
        return { uri };
      },
      inject: [ConfigService],
    }),
    
    UsersModule,
    AuthModule,
    ProductsModule,
    SeedModule,
  ],
})
export class AppModule {}