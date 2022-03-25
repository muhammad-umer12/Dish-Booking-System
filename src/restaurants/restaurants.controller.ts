import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get('by_dish_price')
  getRestaurantsByPriceRange(@Query('min') min:number, @Query('max') max:number)
  {
    
    return this.restaurantsService.findRestaurantByPriceRange(min,max)
  
  }

  @Get('by_name')
  getRestaurantByName(@Query('name') name:string)
  {
    return this.restaurantsService.findRestaurantByName(name)
  }

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  
  
}
