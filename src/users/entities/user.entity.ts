import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Table
export class User extends Model {

    @Column
    cashBalance: number

    @Column
    name: string

    @HasMany(() => Transaction, 'userId')
    dish: Transaction[];

    
}
