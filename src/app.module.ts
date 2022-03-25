import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { UsersModule } from './users/users.module';

import { TransactionsModule } from './transactions/transactions.module';
@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), RestaurantsModule, DishesModule, UsersModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
