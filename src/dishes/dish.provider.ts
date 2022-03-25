
import { Dish } from './entities/dish.entity';

export const dishProviders = [{ provide: 'DishRepository', useValue: Dish }];