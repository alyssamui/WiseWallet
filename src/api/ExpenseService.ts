import dayjsConfig from "../config/dayjsConfig";
import { Expense } from "../types/expense";

const EXPENSE_ID_PREFIX = "expense_";

class ExpenseService {
  private onSuccess(log: string) {
    console.log(log);
  }

  private onError(error: any) {
    console.log(error);
  }

  // POST/PUT
  async setExpense(id: number, data: Expense) {
    let expenseId = EXPENSE_ID_PREFIX + id;
    console.log(id)
    if (id === -1) {
      expenseId =  EXPENSE_ID_PREFIX + (await this.getNextId()).toString()
    }
    const payload = {
      [expenseId]: data,
    };
    console.log(payload);

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.set(payload, () => {
        if (chrome.runtime.lastError) {
          reject(`Failed to add expense: ${JSON.stringify(payload)}`);
        } else {
          resolve(payload);
        }
      });
    });

    response
      .then((res) => {
        this.onSuccess(`Added Expense<${expenseId}>: ${JSON.stringify(res)}`);
      })
      .catch((err) => {
        this.onError(err);
      });
  }

  async getExpense(id: number) {
    const expenseId = EXPENSE_ID_PREFIX + id;

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.get([expenseId], (items) => {
        if (chrome.runtime.lastError) {
          reject(
            `Failed to retrieve entry for Expense<${expenseId}>: ${chrome.runtime.lastError}`
          );
        } else {
          resolve(items);
        }
      });
    });

    const data = response
      .then((res) => {
        this.onSuccess(
          `Retrieved Expense<${expenseId}>: ${JSON.stringify(res)}`
        );
        return Object.values(res as object);
      })
      .catch((err) => {
        this.onError(err);
        return undefined;
      });

    return data;
  }

  async getAllExpenses() {
    const response = new Promise((resolve, reject) => {
      chrome.storage.local.get(null, (items) => {
        if (chrome.runtime.lastError) {
          reject(
            `Failed to retrieve all expenses: ${chrome.runtime.lastError}`
          );
        } else {
          resolve(items);
        }
      });
    });

    const data = await response
      .then((res) => {
        const expenses: Expense[] = [];
        Object.entries(res as object).forEach(([key, value]) => {
          if (key.includes(EXPENSE_ID_PREFIX)) {
            expenses.push(value);
          }
        });

        expenses.length === 0
          ? this.onSuccess(
              "Retrieve expenses successful. There are no expenses."
            )
          : this.onSuccess(
              `Retrieved all expenses: ${expenses
                .map(
                  (expense) => `Expense<${expense.id}>`
                )
                .toString()}`
            );
        return expenses;
      })
      .catch((err) => {
        this.onError(err);
        return [];
      });

    return data;
  }

  // expects month as a numerical 1-12
  async getExpensesByMonth(month: number) {
    console.log("cURRENT MONTH", month)
    const expenses = await this.getAllExpenses();
    const filteredExpenses = (expenses as Expense[]).filter((expense) => {
      console.log("created at", expense.createdAt)
      const expenseMonth = dayjsConfig(expense.createdAt).month();
      console.log("expense month", expenseMonth)
      return month === expenseMonth;
    });
    console.log("FILT", filteredExpenses)
    return filteredExpenses.sort((e1, e2) => {
      const dayjsInst = dayjsConfig(e1.createdAt);
      if (dayjsInst.isBefore(e2.createdAt)) {
        return -1;
      } else if (dayjsInst.isSame(e2.createdAt)) {
        return 0;
      }
      return 1;
    });
  }

  async getNextId() {
    const expenses = await this.getAllExpenses();
    return expenses.length > 0 ? expenses.sort((e1, e2) => e1.id - e2.id)[expenses.length - 1].id + 1 : 1;
  }

  async deleteExpense(id: number) {
    const expenseId = EXPENSE_ID_PREFIX + id;

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.remove([expenseId], () => {
        if (chrome.runtime.lastError) {
          reject(
            `Failed to delete Expense<${expenseId}>: ${chrome.runtime.lastError}`
          );
        } else {
          resolve(null);
        }
      });
    });

    console.log(chrome.storage.local.get())

    response
      .then((res) => {
        this.onSuccess(`Deleted expense<${expenseId}>`);
      })
      .catch((err) => {
        this.onError(err);
      });
  }

  async deleteAllExpenses() {
    const expenses = await this.getAllExpenses();

    const expenseIds: string[] = [];
    expenses.forEach((expense) => {
      expenseIds.push(EXPENSE_ID_PREFIX + expense.id);
    });

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.remove(expenseIds, () => {
        if (chrome.runtime.lastError) {
          reject(`Failed to delete all expenses: ${chrome.runtime.lastError}`);
        } else {
          resolve(null);
        }
      });
    });

    console.log("store", chrome.storage.local.get())

    response
      .then((res) => {
        this.onSuccess(
          `Deleted all expenses: ${expenseIds
            .map((id) => `Expense<${id}>`)
            .toString()}`
        );
      })
      .catch((err) => {
        this.onError(err);
      });
  }
}

export default ExpenseService;
