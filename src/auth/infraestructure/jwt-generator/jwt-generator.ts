import { JwtService } from "@nestjs/jwt";
import { IJWTGenerator } from "_libs/core";

export class JWTGenerator implements IJWTGenerator {
    constructor(
        private readonly jwtService: JwtService
    ) {}
    
    generate(param: string): string {
        return this.jwtService.sign( { id: param } )
    }
}