import { ExecutionContext, createParamDecorator } from "@nestjs/common"

export const GetAccount = createParamDecorator(
    (_data, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        if (!request.account) throw new Error(' 404 account not found')
        return request.account
    }
)