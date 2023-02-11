import { Expense } from "../types/expense";

const EXPENSE_ID_PREFIX = "expense_";

class ExpenseService {
  private onSuccess(data: any) {
    console.log(`Added Income ${JSON.stringify(data)}`);
  }

  private onError(error: any): void {
    console.log(error);
  }

  // private handleResponse(response: any, onSuccess: () => void, onError: () => void, defaultValue = undefined) {
  //   let data = defaultValue;

  //   response.then((res) => {

  //   })
  // }

  // acts as both a post and put
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
        this.onSuccess(res);
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
            `Failed to retrieve entry for income<${expenseId}>: ${chrome.runtime.lastError}`
          );
        } else {
          resolve(items);
        }
      });
    });

    let data = undefined;
    response
      .then((res) => {
        // TODO: improve happy path response
        console.log(res);
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
        // TODO: improve happy path response
        Object.entries(res as object).forEach(([key, value]) => {
          if (key.includes(EXPENSE_ID_PREFIX)) {
            data.push({ [key]: value });
          }
        });

        console.log(res);
        console.log(data);
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
            `Failed to delete expense<${expenseId}>: ${chrome.runtime.lastError}`
          );
        } else {
          resolve(`Deleted expense<${expenseId}>`);
        }
      });
    });

    response
      .then((res) => {
        console.log(res);
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
          resolve("Successfully deleted all expenses");
        }
      });
    });

    response
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        this.onError(err);
      });
  }
}

export default ExpenseService;
