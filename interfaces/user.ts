

export interface IUser {
    _id       : string;   
    name      : string;
    lastName  : string;
    legajo    : string;
    email     : string;
    password? : string;
    role      : string;
    obra?     : string;
    createdAt?: string;
    updatedAt?: string;
}