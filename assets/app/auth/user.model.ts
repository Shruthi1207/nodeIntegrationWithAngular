export class User {
    constructor(public username: string,
                public email: string,
                public password: string,
                public firstName?: string,
                public lastName?: string,
                public claims?: string[],
                public _id?: string
                ) {}
}