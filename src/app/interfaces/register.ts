export interface Register {
    username: string;
    email: string;
    nic:string;
    mobile: string;
    password: string;
    profileImage?:String;
    status?:boolean;
}
export interface Login {
    email: string;
    password: string;
}

export interface User{
    id: number;
    username: string;
    email: string;
    nic?:string;
    mobile: string;
    password?: string;
    profileImage?:File;
    status?:boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
