import { Controller, Get } from "@nestjs/common";
import { envs } from "./config/envs";

@Controller('')
export class ProductController {

    @Get('product')
    public getProduct() {
        console.log('[GET REQUEST] GetProducts')
        return [
            { name: 'Coke', price: '$14.3', id: 'pd-0000001' },
            { name: 'Doritos', price: '$3.3', id: 'pd-0000002' }
        ]
    }

    @Get('config')
    public getConfig() {
        console.log(envs.db_name)
        return envs.db_name
    }
}