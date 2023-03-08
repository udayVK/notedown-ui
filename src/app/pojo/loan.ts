export interface Loan{
    id:number
    name: string;
    totalAmount: number;
    pendingAmount: number;
    date: Date;
    reason: string;
    //true if given loan
    //false if taken loan
    //just to use less memory
    type:boolean;
    //true if loan repaid
    //false if yet to pay
    status:boolean;
    loanHistory:Array<LoanHistory>
}

interface LoanHistory{
    id:number;
    amount:number;
    type:boolean;
    date:Date;
}

export const defaultLoan:Loan = {id:0, name:'', totalAmount: 0,pendingAmount:0, date: new Date(), reason:'',type:true,status:false,loanHistory:[]};