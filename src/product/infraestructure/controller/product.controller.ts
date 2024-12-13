import { Controller, Get, Inject, Param, Post, Query, Body } from "@nestjs/common";
import { envs } from "../../../config/envs";
import { Mongoose } from "mongoose";
import { OdmProductRepository } from "../repository/odm-product-repository";
import { GetManyProducts } from "../dto/get-many";
import { CreateProduct } from "../dto/create";
import { UUIDGenerator } from "_libs/core";

@Controller('product')
export class ProductController {

    private readonly repo: OdmProductRepository
    private readonly uuid: UUIDGenerator

    constructor(
        @Inject('NoSQL') mongo: Mongoose
    ) {
        console.log(' >> ENV_VARIABLES')
        console.log(envs)
        this.repo = new OdmProductRepository(mongo)
        this.uuid = new UUIDGenerator()
    }

    @Get('findmany')
    public async getManyProduct( @Query() entry: GetManyProducts ) {
        console.log(' >> [GET REQUEST] GetManyProducts')
        let page:number = 0
        let perPage:number = 10
        if (entry.page) page = parseInt(entry.page)
        if (entry.perPage) perPage = parseInt(entry.perPage)
        return await this.repo.findMany( { page: page, perPage: perPage } )
    }

    @Get('find/:id')
    public async getProductById( @Param('id') id: string  ) {
        console.log(' >> [GET REQUEST] GetProductById')
        return await this.repo.findById(id)
    }

    @Post('create')
    public async createProduct( @Body() entry: CreateProduct ) {
        console.log(' >> [POST REQUEST] CreateProduct')
        return await this.repo.saveProduct({
            id: await this.uuid.generate(),
            ...entry
        })
    }

}
