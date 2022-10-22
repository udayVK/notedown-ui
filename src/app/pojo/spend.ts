import { Category, defaultCategory } from "./category";

export interface Spend{
    id:number;
    purpose:string;
    date:Date;
    money:number;
    forOthers:number;
    category:Category;
}

export const defaultSpend = {id:NaN,purpose:'',date:new Date(),money:NaN,forOthers:NaN,category:defaultCategory} ;