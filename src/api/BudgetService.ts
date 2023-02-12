import dayjsConfig from "../config/dayjsConfig";
import { Expense } from "../types/expense";
import ExpenseService from "./ExpenseService";

const BUDGET_PREFIX = "budget";

class BudgetService {
  private onSuccess(log: string) {
    console.log(log);
  }

  private onError(error: any) {
    console.log(error);
  }

  async calculateCurrentBudgetLeft() {
    const budget = await this.getBudget();
    const service = new ExpenseService();
    const expenses = await service.getAllExpenses();
    const currMonth = dayjsConfig().month();
    const filteredExpenses = (expenses as Expense[]).filter((expense) => {
      const expenseMonth = dayjsConfig(expense.createdAt).month();
      return currMonth === expenseMonth;
    });
    const costs = filteredExpenses.reduce(
      (acc: number, curr: Expense) => acc + curr.amount,
      0
    );

    return budget - costs;
  }

  async editBudget(maxSpendings: number) {
    const payload = {
      [BUDGET_PREFIX]: maxSpendings,
    };

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.set(payload, () => {
        if (chrome.runtime.lastError) {
          reject(
            `Failed to add Budget with ${maxSpendings}: ${chrome.runtime.lastError}`
          );
        } else {
          resolve(payload);
        }
      });
    });

    response
      .then((res) => {
        this.onSuccess(`Added Budget ${maxSpendings}`);
      })
      .catch((err) => {
        this.onError(err);
      });
  }

  async getBudget() {
    const response = new Promise((resolve, reject) => {
      chrome.storage.local.get([BUDGET_PREFIX], (items) => {
        if (chrome.runtime.lastError) {
          reject(`Failed to retrieve budget: ${chrome.runtime.lastError}`);
        } else {
          resolve(items);
        }
      });
    });

    const data = response
      .then((res: any) => {
        this.onSuccess(`Retrieved budget: ${JSON.stringify(res)}`);
        return res[BUDGET_PREFIX];
      })
      .catch((err) => {
        this.onError(err);
        return [];
      });

    return data;
  }
}

export default BudgetService;
