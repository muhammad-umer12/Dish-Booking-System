import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Transaction extends Model{

    @Column
    dishName:String

    @Column
    restaurantName: String

    @Column
    transactionAmount: number

    @Column
    transactionDate: Date

    
    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User, 'userId')
    user: User;
}
