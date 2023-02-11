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
    const expenseId = EXPENSE_ID_PREFIX + id;
    const payload = {
      [expenseId]: data,
    };

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.set(payload, () => {
        if (chrome.runtime.lastError) {
          reject(`Failed to add income: ${JSON.stringify(payload)}`);
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

    let data = undefined;
    response
      .then((res) => {
        this.onSuccess(
          `Retrieved Expense<${expenseId}>: ${JSON.stringify(res)}`
        );
        data = res;
      })
      .catch((err) => {
        this.onError(err);
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

    const data: any[] = [];
    response
      .then((res) => {
        Object.entries(res as object).forEach(([key, value]) => {
          if (key.includes(EXPENSE_ID_PREFIX)) {
            data.push({ [key]: value });
          }
        });

        this.onSuccess(
          `Retrieved all expenses: ${data
            .map((expense) => `Expense<${Object.keys(expense as object)[0]}>`)
            .toString()})}`
        );
      })
      .catch((err) => {
        this.onError(err);
      });

    return data;
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
      expenseIds.concat(Object.keys(expense as object));
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

    response
      .then((res) => {
        this.onSuccess(
          `Deleted all expenses: ${expenseIds
            .map((id) => `Expense<${id}`)
            .toString()}`
        );
      })
      .catch((err) => {
        this.onError(err);
      });
  }
}

export default ExpenseService;
