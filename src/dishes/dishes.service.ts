import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { Op } from 'sequelize';
@Injectable()
export class DishesService {

  constructor(@Inject('DishRepository') 
  private  dishRepository: typeof Dish, private readonly restaurantService: RestaurantsService) {}
  


  async create(createDishDto: CreateDishDto) {

    try{

    
    let isRestaurantExist = await this.restaurantService.isExist(createDishDto.restaurantId);
    if(isRestaurantExist != null)
    {
      let dish = new Dish();
      dish.restaurantId = createDishDto.restaurantId;
      dish.price =  createDishDto.price;
      dish.dishName = createDishDto.dishName

      let result = dish.save();
      return result;
    }
    else{
     throw  new HttpException('Restaurant does not exist', HttpStatus.BAD_REQUEST);
    }
  }
    catch(err)
    {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }
   
  
  
  findAll() {
    const dishes = this.dishRepository.findAll();
    return dishes;
 
  }


  async findDishByDishName(name:string):Promise<Dish[]>
  {
      const dishList = await this.dishRepository.findAll({
        where:{
          dishName:{
            [Op.like]: '%' + name + '%'
          }
          
        }
      })

      return dishList;
  }

  async findOneDishbyName(name: string)
  {
    const result = await this.dishRepository.findOne({ where: {dishName:name}})

    return result;
  }
}
