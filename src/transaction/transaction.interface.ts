export interface BaseTransaction {
  userEmail: string;
  amount: number;
  type: string;
  createdAt: Date;
}

export interface ITransaction extends BaseTransaction {}
