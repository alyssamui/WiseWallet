
const CATEGORY_PREFIX = "category";

class CategoryService {
  private onSuccess(log: string) {
    console.log(log);
  }

  private onError(error: any) {
    console.log(error);
  }


  async addCategory(category: string) {
    // get all current categories and then update the stored list with the new category
    const categories = await this.getCategories();
    if (categories.findIndex((c) => {
      return c === category
    }) === -1) {
      categories.push(category);
    }

    const payload = {
      [CATEGORY_PREFIX]: categories,
    };

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.set(payload, () => {
        if (chrome.runtime.lastError) {
          reject(
            `Failed to add Category ${category}. ${chrome.runtime.lastError}`
          );
        } else {
          resolve(payload);
        }
      });
    });

    let data = undefined;
    response
      .then((res) => {
        this.onSuccess(`Added Category ${category}`);
        data = res;
      })
      .catch((err) => {
        this.onError(err);
      });

    return data;
  }

  async getCategories() {
    const response = new Promise((resolve, reject) => {
      chrome.storage.local.get([CATEGORY_PREFIX], (items) => {
        if (chrome.runtime.lastError) {
          reject(
            `Failed to retrieve all categories: ${chrome.runtime.lastError}`
          );
        } else {
          resolve(items);
        }
      });
    });

    let data: string[] = [];
    response
      .then((res: any) => {
        this.onSuccess(`Retrieved all categories: ${JSON.stringify(res)}`);
        data = res[CATEGORY_PREFIX];
      })
      .catch((err) => {
        this.onError(err);
      });

    return data;
  }

  async deleteCategory(category: string) {
    // get all current categories and then update the stored list with the new category
    const categories = await this.getCategories();
    const deleteIdx = categories.findIndex((c) => c === category);
    if (deleteIdx > -1) {
      categories.splice(deleteIdx, 1);
    } else {
      this.onError(`Category ${category} does not exist`);
      return undefined;
    }

    const payload = {
      [CATEGORY_PREFIX]: categories,
    };

    const response = new Promise((resolve, reject) => {
      chrome.storage.local.set(payload, () => {
        if (chrome.runtime.lastError) {
          reject(
            `Failed to delete Category ${category}. ${chrome.runtime.lastError}`
          );
        } else {
          resolve(payload);
        }
      });
    });

    let data = undefined;
    response
      .then((res) => {
        this.onSuccess(`Deleted Category ${category}`);
        data = res;
      })
      .catch((err) => {
        this.onError(err);
      });

    return data;
  }
}

export default CategoryService;
