
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Dish } from 'src/dishes/entities/dish.entity';
@Table
export class Restaurant extends Model{

    @Column
    cashBalance: number;
  
    @Column
    openingHours: string;
  
    @Column
    restaurantName: string;

    @HasMany(() => Dish, 'restaurantId')
    dish: Dish[];
}

