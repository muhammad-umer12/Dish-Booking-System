import { Injectable,Inject, Type, HttpException, HttpStatus } from '@nestjs/common';
import { listenerCount } from 'process';
import { Dish } from 'src/dishes/entities/dish.entity';
import { Op } from 'sequelize';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {

  constructor(@Inject('RestaurantRepository') 
  private  restaurantRepository: typeof Restaurant) {}

  async isExist(id: number)
  {
    const result = await this.restaurantRepository.findByPk(id);
    return result;
  }
  async create(createRestaurantDto: CreateRestaurantDto) {
    
    try{
      let restaurant = new Restaurant();
      restaurant.restaurantName = createRestaurantDto.restaurantName;
      restaurant.openingHours = createRestaurantDto.openingHours;
      restaurant.cashBalance = createRestaurantDto.cashBalance;

      const restaurantData = await restaurant.save();
      return restaurantData;
    }
    catch (err) {


      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
 

  }

  async findRestaurantByName(name:string)
  {
      const restaurantList = await this.restaurantRepository.findAll({
        where:{
          restaurantName:{
            [Op.like]: '%' + name + '%'
          }
          
        }
      })

      return restaurantList;
  }

  async findRestaurantByPriceRange(min: number, max:number)
  {
    
    console.log('called')
     const restaurantList = await  this.restaurantRepository.findAll({
        
        include: [{
          model: Dish,
          where: {
            price:{
              [Op.and]:{
                [Op.lte]:max,
                [Op.gte]:min
              }
              
            }
          }
         }]
      })
      return restaurantList;
    
  }

 async findAll() {
    const restaurants = this.restaurantRepository.findAll();
    return restaurants;
  }


  async findOneRestaurantByName( name: string)
  {
      const result = await this.restaurantRepository.findOne(
        { where:{ restaurantName:name},
       }
        
        )
      return result
  }

  async increaseCashBalance(amount: number, restaurantName: string)
  {
    const restaurant = await this.restaurantRepository.findOne({ where:{ restaurantName: restaurantName }});
    let cashBalance = restaurant.cashBalance + amount;
    
      console.log(restaurant)
      const result = await this.restaurantRepository.update(

        {cashBalance: cashBalance},
        {where:{restaurantName:restaurantName }}
        
        )
  
    return true;

  }
}


