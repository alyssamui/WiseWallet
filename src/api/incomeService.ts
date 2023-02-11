
class IncomeService {
    
    constructor() {

    }

    static OnSuccess(model : IncomeModel) {
        console.log(`Added Income ${model.title}`);
    }

    // onError(error) {
    //     console.log(`Error`)
    // }

    static async setIncome(id : number, model : IncomeModel) {
        const income = "Income" + id;
        chrome.storage.sync.set({income: model}).then(() => {
            IncomeService.OnSuccess(model);
        }); 
    }

}


interface IncomeModel {
    title: string;
    description?: string;
    type: PayType;
    amount: number;
    createdAt?: Date;
}


enum PayType {
    Hourly,
    Weekly,
    Salarly
}

export default IncomeService;