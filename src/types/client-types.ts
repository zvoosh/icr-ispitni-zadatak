export interface IClient {
    _id?: string;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    favoritePlace: string[];
    isAdmin?: boolean
}

export interface IClientCreate extends Omit<IClient, 'id'> { }