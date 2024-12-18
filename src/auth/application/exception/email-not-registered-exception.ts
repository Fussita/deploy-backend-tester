
export class EmailNotRegisteredException extends Error {
    constructor () {
        super( 'error: email-not-registered' )
    }
    static create() {
        return new EmailNotRegisteredException()
    }
}
