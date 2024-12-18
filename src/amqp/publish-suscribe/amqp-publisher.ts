import { Channel, connect } from 'amqplib'
import { AMQPExchange } from './_model/amqp-exchange'
import { envs } from 'src/config/envs'

export class AMQPPublisher {

    private channel: Channel
    
    constructor() {
        this.init()
    }

    private async init() {
        //`amqp://${envs.rabbitmq_host}`
        const connection = await connect(envs.rabbitmq_host)
        this.channel = await connection.createChannel()
    }    

    async buildExchange( exchange: AMQPExchange ) {
        await this.channel.assertExchange( exchange.name, exchange.type )
    }

    async publishExchange<T> ( exchange: AMQPExchange, message: T, routingKey: string = '' ) {
        await this.channel.publish( exchange.name, routingKey, Buffer.from(JSON.stringify(message)) )
    }

}