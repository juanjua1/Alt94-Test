import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Comentamos MongoDB temporalmente
    // MongooseModule.forRoot('mongodb://localhost:27017/property_db'),
    UsersModule,
    AuthModule,
    ProductsModule,
    // SeedModule, // Comentamos porque depende de MongoDB
  ],
})
export class AppModule {}
