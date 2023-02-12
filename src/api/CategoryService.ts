import { Category } from "../types/category";

const CATEGORY_PREFIX = "category";

class CategoryService {
  private onSuccess(log: string) {
    console.log(log);
  }

  private onError(error: any) {
    console.log(error);
  }

  static categoriesToString(categories: Category[]): string[] {
    return categories.map((category) => category.title);
  }

  static stringsToCategories(strings: string[]): Category[] {
    return strings.map((str) => ({ title: str } as Category));
  }

  async addCategory(category: string) {
    // get all current categories and then update the stored list with the new category
    const categories = await this.getCategories();
    categories.push({ title: category });

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

    response
      .then((res) => {
        this.onSuccess(`Added Category ${category}`);
      })
      .catch((err) => {
        this.onError(err);
      });
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

    const data = response
      .then((res: any) => {
        this.onSuccess(`Retrieved all categories: ${JSON.stringify(res)}`);
        return res[CATEGORY_PREFIX];
      })
      .catch((err) => {
        this.onError(err);
        return [];
      });

    return data;
  }

  async deleteCategory(category: string) {
    // get all current categories and then update the stored list with the new category
    const categories = await this.getCategories();
    const deleteIdx = categories.findIndex((c) => c.title === category);
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
          resolve(null);
        }
      });
    });

    response
      .then((res) => {
        this.onSuccess(`Deleted Category ${category}`);
      })
      .catch((err) => {
        this.onError(err);
      });
  }
}

export default CategoryService;
