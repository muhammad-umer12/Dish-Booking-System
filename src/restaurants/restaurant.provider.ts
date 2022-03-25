
import { Restaurant } from './entities/restaurant.entity';

export const restaurantProviders = [{ provide: 'RestaurantRepository', useValue: Restaurant }];