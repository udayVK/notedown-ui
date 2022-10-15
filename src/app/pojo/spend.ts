import SubSpend from "./subspend";

export interface Spend{
    id:number;
    heading: string;
    date: Date;
    spends:Array<SubSpend>;
}