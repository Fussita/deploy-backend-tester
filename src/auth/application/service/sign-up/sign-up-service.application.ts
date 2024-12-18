import { IService, IEncryptor, Result, IUUIDGenerator, IJWTGenerator } from '_libs/core'
import { EmailRegisteredException } from '../../exception'
import { SignUpEntry } from './dto/sign-up-entry-dto'
import { SignUpResponse } from './dto/sign-up-response-dto'
import { OdmAccountRepository } from 'src/account/infraestructure/repository/odm-repository/odm-repository-account'

export class SignUpService implements IService<SignUpEntry, SignUpResponse> {

    constructor(
        private readonly accountRepo: OdmAccountRepository,
        private readonly encryptor: IEncryptor,
        private readonly idGen: IUUIDGenerator,
        private readonly jwtGen: IJWTGenerator
    ) {}

    async execute(data: SignUpEntry): Promise<Result<SignUpResponse>> {
        const exists = await this.accountRepo.findByEmail(data.email)
        if (exists.isSuccess()) return Result.fail( EmailRegisteredException.create() )
        const cipherPassword = await this.encryptor.hash(data.password)
        const result = await this.accountRepo.saveAccount({
            id: this.idGen.generate(),
            email: data.email,
            password: cipherPassword,
        })
        if (!result.isSuccess()) return Result.fail(result.Error)
        return Result.success({
            id: result.Value,
            token: this.jwtGen.generate(result.Value),
        })
    }

}