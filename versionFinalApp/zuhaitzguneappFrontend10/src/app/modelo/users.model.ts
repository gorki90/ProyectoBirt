export class Users {
    constructor(
        public name?: string,
        public username?: string,
        public password?: any,
        public foto?:string,
        public current_password?:string,
        public email?:string,
        public password_confirmation?:string
    ){}
}