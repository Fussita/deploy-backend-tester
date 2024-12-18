import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"

@Schema({ collection: 'account' })
export class OdmAccount extends Document {

    @Prop({ type: String, unique: true, index: true, required: true }) 
    id: string
   
    @Prop({ type: String, unique: true, required: true }) 
    email: string
    
    @Prop({ type: String, required: true }) 
    password: string
    
}

export const OdmAccountSchema = SchemaFactory.createForClass( OdmAccount )