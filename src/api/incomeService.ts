import { Income } from "../types/income";

const INCOME_ID_PREFIX = "income_";

class IncomeService {
  private onSuccess(data: any) {
    console.log(`Added Income ${JSON.stringify(data)}`);
  }

  private onError(error: any): void {
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
        this.onSuccess(res);
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
            `Failed to retrieve entry for income<${incomeId}>: ${chrome.runtime.lastError}`
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
}

export default IncomeService;
