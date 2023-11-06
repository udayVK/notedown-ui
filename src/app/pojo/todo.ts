export interface ToDo {
    id: number;
    description: string;
    whenToDO: Date;
    status: boolean;
};

export const defaultDodo:ToDo = { id:NaN, description:'', whenToDO: new Date(), status: false};