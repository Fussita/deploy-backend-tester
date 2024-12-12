import { IUUIDGenerator } from "_libs/core/application";
import { v4 } from "uuid";

export class UUIDGenerator implements IUUIDGenerator {
    
    generate(): string {
        return v4()
    }

}