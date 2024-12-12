import { Result } from "_libs/core";

export interface IDomainService<D, R>{
    execute ( domain: D ): Promise<Result<R>>
}