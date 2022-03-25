import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { restaurantProviders } from './restaurant.provider';
@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService,...restaurantProviders],
  exports: [RestaurantsService]
})
export class RestaurantsModule {}
