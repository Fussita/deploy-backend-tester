
export class EmailRegisteredException extends Error {
    constructor () {
        super( 'error: email-registered' )
    }
    static create() {
        return new EmailRegisteredException()
    }
}
