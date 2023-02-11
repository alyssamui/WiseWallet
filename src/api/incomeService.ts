
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
        console.log(`chrome storage local: ${chrome.storage}`)

        new Promise((resolve, reject) => {chrome.storage.local.set({"test": 1}, () => {
            resolve(console.log("SUCCESS"));
        })});

            
        // .then(() => {
        //     IncomeService.OnSuccess(model);
        // }); 
    }

}


interface IncomeModel {
    title: string;
    description?: string;
    type: PayType;
    amount: number;
    createdAt?: Date;
}


export enum PayType {
    Hourly,
    Weekly,
    Salarly
}

export default IncomeService;