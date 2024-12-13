import { Pagination } from "_libs/core";
import { Model, Mongoose } from "mongoose";
import { OdmProduct, OdmProductSchema } from "../entity/odm-product";
import { ProductModel } from "src/product/application/entity/product-model";

export class OdmProductRepository {
    
    private readonly model: Model<OdmProduct>

    constructor( mongoose: Mongoose ) { 
        this.model = mongoose.model<OdmProduct>('OdmProduct', OdmProductSchema)
    }

    async findMany(pag: Pagination): Promise<ProductModel[]> {
        const result = await this.model.find({}, {},  { skip: pag.page, limit: pag.perPage })
        const mapped = []
        result.forEach( e => mapped.push(
            {
                id: e.id,        
                name: e.name,
                price: e.price,
                image: e.image   
            }
        ))
        return mapped
    }

    async saveProduct(entry: ProductModel): Promise<ProductModel> {
        try {
            const odm = new this.model(entry)
            await this.model.create( odm )
            return entry
        } catch (e) {
            throw new Error('Error saving product')
        }
    }
    
    async findById(entry: string): Promise<ProductModel> {
        const odm = await this.model.findOne( { id: entry } )
        if ( !odm ) throw new Error('Not found')
        return {
            id: odm.id,        
            name: odm.name,
            price: odm.price,
            image: odm.image   
        }
    }

}