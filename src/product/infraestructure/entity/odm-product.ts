import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ collection: 'odm_product' })
export class OdmProduct extends Document {
    
    @Prop({ type: String, unique: true, required: true })
    id: string
        
    @Prop({ type: String, required: true }) 
    name: string
    
    @Prop({ type: String, required: true }) 
    price: string
    
    @Prop({ type: [String], required: true, }) 
    image: string[]

}

export const OdmProductSchema = SchemaFactory.createForClass( OdmProduct )