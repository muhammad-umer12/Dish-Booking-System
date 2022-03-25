import { Injectable,Inject, HttpException, HttpStatus } from '@nestjs/common';
import { where } from 'sequelize/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@Inject('UserRepository')  private  userRepository: typeof User){}

  async isExist(id: number)
  {
    const result = await this.userRepository.findByPk(id)
    return result;
  }
  async create(createUserDto: CreateUserDto) {

    try{
      let user = new User();
      user.cashBalance = createUserDto.cashBalance;
      user.name = createUserDto.name

      const userData = await user.save();
      return userData;
    }
    catch (err) {


      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  }
    
  }

  findAll() {
    return `This action returns all users`;
  }

  


  async deductPurchaseAmount(amount:number,userId: number)
  {
    
      const user = await this.userRepository.findByPk(userId);
      
      let cashBalance = user.cashBalance - amount
      console.log('balance = ',cashBalance)
      if(cashBalance < 0)
      {
        return false
      }
      else{
        const result = await this.userRepository.update(

          {cashBalance: cashBalance},
          {where:{id:userId }}
          
          )
      }
    

      return true;
  }
}
