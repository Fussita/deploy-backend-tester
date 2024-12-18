
import { IEncryptor } from '_libs/core'
import * as bcrypt from 'bcrypt'

export class BcryptEncryptor implements IEncryptor {
    constructor() {}
    
    hash(planeText: string): string {
        return bcrypt.hash(planeText, 10)
    }
    
    compareHash(planeText: string, cipherText: string): boolean {
        return bcrypt.compare(planeText, cipherText)
    }
    
}