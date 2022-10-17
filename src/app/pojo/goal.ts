export interface Goal{
    id:number;
    desc:string;
    upto:Date;
    status:boolean;
}

export const defaultGoal:Goal = {id:0,desc:'',upto:new Date(),status:false};