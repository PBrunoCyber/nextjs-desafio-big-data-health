interface ILogin {
    username: string,
    password: string
}

export interface IRegister {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export interface IRegisterResponse extends IRegister {
    id: number,
}
