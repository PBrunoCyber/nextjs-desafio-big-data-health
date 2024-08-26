interface ILogin {
    username: string,
    password: string
}

export interface IRegister {
    email: string,
    password: string,
    name: {
        firstname: string,
        lastname: string
    },
    address: {
        city: string,
        street: string,
        number: number,
        zipcode: string,
        geolocation: {
            lat: string,
            long: string
        },
    },
    phone: string,

}

export interface IRegisterResponse extends IRegister {
    id: number,
}
