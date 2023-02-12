import { Income } from "../types/income";

const INCOME_ID_PREFIX = "income_";

class IncomeService {
  private onSuccess(log: string) {
    console.log(log);
  }

  private onError(error: any) {
    console.log(error);
  }

  async setIncome(id: number, data: Income) {
    const incomeId = INCOME_ID_PREFIX + id;
    const payload = {
      [incomeId]: data,
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
        this.onSuccess(`Added Income<${incomeId}>: ${JSON.stringify(res)}`);
      })
      .catch((err) => {
        this.onError(err);
      });
  }

  async getIncome(id: number) {
    const incomeId = INCOME_ID_PREFIX + id;

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.get([incomeId], (items) => {
        if (chrome.runtime.lastError) {
          reject(
            `Failed to retrieve entry for Income<${incomeId}>: ${chrome.runtime.lastError}`
          );
        } else {
          resolve(items);
        }
      });
    });

    const data = response
      .then((res) => {
        this.onSuccess(`Retrieved Income<${incomeId}>: ${JSON.stringify(res)}`);
        return Object.values(res as object);
      })
      .catch((err) => {
        this.onError(err);
      });

    return data;
  }

  async getAllIncomes() {
    const response = new Promise((resolve, reject) => {
      chrome.storage.local.get(null, (items) => {
        if (chrome.runtime.lastError) {
          reject(`Failed to retrieve all incomes: ${chrome.runtime.lastError}`);
        } else {
          resolve(items);
        }
      });
    });

    const data = response
      .then((res) => {
        const incomes: Income[] = [];
        Object.entries(res as object).forEach(([key, value]) => {
          if (key.includes(INCOME_ID_PREFIX)) {
            incomes.push(value);
          }
        });

        incomes.length === 0
          ? this.onSuccess("Retrieve incomes successful. There are no incomes.")
          : this.onSuccess(
              `Retrieved all incomes: ${incomes
                .map((income) => `Income<${Object.keys(income as object)[0]}>`)
                .toString()}`
            );
        return incomes;
      })
      .catch((err) => {
        this.onError(err);
        return [];
      });

    return data;
  }

  async deleteIncome(id: number) {
    const incomeId = INCOME_ID_PREFIX + id;

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.remove([incomeId], () => {
        if (chrome.runtime.lastError) {
          reject(
            `Failed to delete Income<${incomeId}>: ${chrome.runtime.lastError}`
          );
        } else {
          resolve(null);
        }
      });
    });

    response
      .then((res) => {
        this.onSuccess(`Deleted income<${incomeId}>`);
      })
      .catch((err) => {
        this.onError(err);
      });
  }

  async deleteAllIncomes() {
    const incomes = await this.getAllIncomes();

    const incomeIds: string[] = [];
    incomes.forEach((income) => {
      incomeIds.push(INCOME_ID_PREFIX + income.id);
    });

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.remove(incomeIds, () => {
        if (chrome.runtime.lastError) {
          reject(`Failed to delete all incomes: ${chrome.runtime.lastError}`);
        } else {
          resolve(null);
        }
      });
    });

    response
      .then((res) => {
        this.onSuccess(
          `Deleted all expenses: ${incomeIds
            .map((id) => `Expense<${id}>`)
            .toString()}`
        );
      })
      .catch((err) => {
        this.onError(err);
      });
  }
}

export default IncomeService;
