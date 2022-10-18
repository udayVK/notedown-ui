import { Category, defaultCategory } from "./category";

export interface Spend{
    id:number;
    purpose:string;
    date:Date;
    money:number;
    forOthers:number;
    category:Category;
}

export const defaultSpend = {id:0,purpose:'',date:new Date(),money:0,forOthers:0,category:defaultCategory} ;