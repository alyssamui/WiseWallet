class FeatureFlagService {

  private onSuccess(data: any) {
    console.log(`Added Income ${JSON.stringify(data)}`);
  }

  private onError(error: any): void {
    console.log(error);
  }

  async toggle(flagName: string, state: boolean) {
    const payload = { [flagName]: state };
    const response = new Promise((resolve, reject) => {
      chrome.storage.local.set(payload, () => {
        if (chrome.runtime.lastError) {
          reject(`Failed to add Feature Flag: ${JSON.stringify(payload)}`);
        } else {
          resolve(payload);
        }
      });
    });

    response
      .then((res) => this.onSuccess(res))
      .catch((err) => this.onError(err));

    return 0;
  }

  async getState(flag : string) {
    const response = new Promise((resolve, reject) => {
      chrome.storage.local.get([flag], (items) => {
        resolve(items);
      });
    });

    const data = response
      .then((res) => {
        this.onSuccess(res);
        return res;
      })
      .catch((err) => this.onError(err));

    return data;
  }
}

export default FeatureFlagService;
