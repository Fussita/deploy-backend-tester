
export interface IEncryptor {
    hash(planeText: string): string
    compareHash(planeText: string, cipherText: string): boolean
}