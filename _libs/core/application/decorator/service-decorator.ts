import { Result } from "_libs/core"
import { IService } from "../service/service.interface"

export abstract class IServiceDecorator<D, R> implements IService<D, R> {
    protected service: IService<D, R>
    
    constructor ( service: IService<D, R> ) {
        this.service = service
    }

    execute ( data: D ): Promise<Result<R>> {
        return this.service.execute( data )
    }

}