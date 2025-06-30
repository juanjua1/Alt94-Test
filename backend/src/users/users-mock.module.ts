import { Module } from '@nestjs/common';
import { MockUsersService } from '../mock/mock.services';
import { UsersController } from './users.controller';

@Module({
  providers: [
    {
      provide: 'UsersService',
      useClass: MockUsersService,
    },
  ],
  controllers: [UsersController],
  exports: ['UsersService'],
})
export class MockUsersModule {}
