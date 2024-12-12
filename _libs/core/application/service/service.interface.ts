import { Result } from "_libs/core";

export interface IService<D, R> {
    execute ( data: D ): Promise<Result<R>>
}