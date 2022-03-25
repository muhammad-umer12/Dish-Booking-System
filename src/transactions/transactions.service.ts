import { Injectable,Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { UsersService } from 'src/users/users.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { DishesService } from 'src/dishes/dishes.service';
@Injectable()
export class TransactionsService {

  constructor(@Inject('TransactionRepository') 
  private  transasctionRepository: typeof Transaction,
  private readonly  usersService: UsersService,
  private readonly restaurantService: RestaurantsService,
  private readonly dishService: DishesService
    ) {}



 async  create(createTransactionDto: CreateTransactionDto) {

    try{

      let isDishExist = await this.dishService.findOneDishbyName(createTransactionDto.dishName)
      let isRestaurantExist = await this.restaurantService.findOneRestaurantByName(createTransactionDto.restaurantName)
      let isUserExist = await this.usersService.isExist(createTransactionDto.userId);
     

      if(isUserExist != null && isDishExist!= null && isRestaurantExist!= null)
      {
        const deduction = await this.usersService.deductPurchaseAmount(createTransactionDto.transactionAmount,isUserExist.id)
        const addCash = await this.restaurantService.increaseCashBalance(createTransactionDto.transactionAmount,isRestaurantExist.restaurantName)

        if(!deduction)
        {
          throw  new HttpException('You do not have enough balance for this transaction', HttpStatus.BAD_REQUEST);
        }
        let transaction = new Transaction();
        transaction.restaurantName = createTransactionDto.restaurantName;
        transaction.userId = createTransactionDto.userId;
        transaction.transactionAmount = createTransactionDto.transactionAmount;
        transaction.transactionDate = new Date();
        transaction.dishName = createTransactionDto.dishName;
        let result = transaction.save();

        
        return result;
      }
      else{
       throw  new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
      }
    }
      catch(err)
      {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  async findAll() {
    const result = await this.transasctionRepository.findAll();
    return result;
  }

  


}
