import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  create(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.create(createDishDto);
  }

  @Get('by_name')
  getDishByName(@Query('name') name:string):Promise<Dish[]>
  {
    return this.dishesService.findDishByDishName(name)
  }

  @Get()
  findAll() {
    return this.dishesService.findAll();
  }

  
}
