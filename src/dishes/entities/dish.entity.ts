import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Table
export class Dish extends Model {

    @Column
    dishName: string;

    @Column
    price: number


    @ForeignKey(() => Restaurant)
    @Column
    restaurantId: number;

    @BelongsTo(() => Restaurant, 'restaurantId')
    restaurant: Restaurant;
}
