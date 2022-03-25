import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { transactionProviders } from './transactions.provider';
import { UsersModule } from 'src/users/users.module';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { DishesModule } from 'src/dishes/dishes.module';
@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, ...transactionProviders],
  imports:[RestaurantsModule,UsersModule,DishesModule],
  exports:[TransactionsService]
})
export class TransactionsModule {}
