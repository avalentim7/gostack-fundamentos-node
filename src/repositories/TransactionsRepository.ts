import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const { income, outcome } = this.transactions.reduce((total, transaction) => {
      switch (transaction.type) {
        case 'income':
          total.income += transaction.value
          break
        case 'outcome':
          total.outcome += transaction.value
          break
        default:
          break
      }

      return total
    }, {
      income: 0,
      outcome: 0
    });

    const total = income - outcome

    return { total, income, outcome }
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
