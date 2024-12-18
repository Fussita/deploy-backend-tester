import { IService, IEncryptor, IJWTGenerator, Result } from '_libs/core'
import { EmailNotRegisteredException, IncorrectPasswordException } from '../../exception'
import { SignInEntry } from './dto/sign-in-entry-dto'
import { SignInResponse } from './dto/sign-in-response-dto'
import { OdmAccountRepository } from 'src/account/infraestructure/repository/odm-repository/odm-repository-account'

export class SignInService implements IService<SignInEntry, SignInResponse> {

    constructor(
        private readonly accountRepo: OdmAccountRepository,
        private readonly encryptor: IEncryptor,
        private readonly jwtGen: IJWTGenerator,
    ) {}

    async execute(data: SignInEntry): Promise<Result<SignInResponse>> {
        const exists = await this.accountRepo.findByEmail(data.email)
        if (!exists.isSuccess()) return Result.fail( EmailNotRegisteredException.create() )
        const account = exists.Value
        const compareResult = await this.encryptor.compareHash(data.password, account.password)
        if (!compareResult) return Result.fail( IncorrectPasswordException.create() )
        return Result.success({
            token: this.jwtGen.generate(account.id),
            id: account.id
        })
    }

}