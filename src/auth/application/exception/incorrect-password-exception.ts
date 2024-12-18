
export class IncorrectPasswordException extends Error {
    constructor () {
        super( 'error: incorrect-password' )
    }
    static create() {
        return new IncorrectPasswordException()
    }
}
