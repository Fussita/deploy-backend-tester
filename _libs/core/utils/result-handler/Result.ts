import { BadRequestException } from "@nestjs/common"

export class Result<T> {
    private value?: T
    private error?: Error

    private constructor ( value: T, error: Error ) {
        this.error = error
        this.value = value
    }

    isSuccess (): boolean {
        if ( this.value || this.Value == 0) return true
        return false
    }

    get Value (): T {
        if ( this.isSuccess ) return this.value
        throw new BadRequestException( 'The value does not exists' )
    }

    get Error (): Error {
        if ( this.error ) return this.error
        throw new BadRequestException( 'The error does not exists' )
    }

    static success<T> ( value: T ): Result<T> {
        return new Result( value, null )
    }

    static fail<T> ( error: Error ): Result<T> {
        return new Result( null, error )
    }
}