import { Model, Mongoose } from "mongoose";
import { AccountModel } from "src/account/application/entity-model/account-model.interface";
import { Result } from "_libs/core";
import { OdmAccount, OdmAccountSchema } from "../../entity/odm-account.entity";

export class OdmAccountRepository {
    
    private readonly model: Model<OdmAccount>;

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<OdmAccount>('OdmAccount', OdmAccountSchema)
    }

    async findByEmail(email: string): Promise<Result<AccountModel>> {
        const odm = await this.model.findOne( { email: email } )
        if ( !odm ) return Result.fail(new Error('Account not found'))
        return Result.success( {
            id: odm.id,
            email: odm.email,
            password: odm.password
        } )
    }

    async saveAccount(entry: AccountModel): Promise<Result<string>> {
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
            return Result.success( entry.id )
        } catch (e) {
            return Result.fail( new Error('') )
        }
    }

    async findById(id: string): Promise<Result<AccountModel>> {
        const odm = await this.model.findOne( { id: id } )
        if ( !odm ) return Result.fail(new Error('Account not found'))
        return Result.success( odm )
    }

}