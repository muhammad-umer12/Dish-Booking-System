import { Transaction } from "./entities/transaction.entity";

export const transactionProviders = [{ provide: 'TransactionRepository', useValue: Transaction }];