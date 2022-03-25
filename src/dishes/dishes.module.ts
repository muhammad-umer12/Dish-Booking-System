import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { dishProviders } from './dish.provider';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
@Module({
  
  controllers: [DishesController],
  providers: [DishesService, ...dishProviders],
  imports:[RestaurantsModule],
  exports: [DishesService]
})
export class DishesModule {}
