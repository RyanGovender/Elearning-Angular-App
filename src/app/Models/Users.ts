
export interface Users{
    id:string;
    email:string;
    name:string;
    surname:string;
    emailConfirmed:boolean;
    passwordHash:string;
    avatarUrl:string;
    createdDate:Date;
    modifiedDate:Date;
}