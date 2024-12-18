import { Channel, connect } from 'amqplib'
import { AMQPQueue } from './_model/amqp-queue'
import { envs } from 'src/config/envs'

export class AMQPConsumer {
    
    private channel: Channel

    constructor() {
        this.init()
    }
    private async init() {
        //`amqp://${envs.rabbitmq_host}`
        const connection = await connect(envs.rabbitmq_host)
        this.channel = await connection.createChannel()
    }    

    async buildQueue( queue: AMQPQueue ) {
        await this.channel.assertQueue( queue.name )    
        if ( queue.exchange ) {
            await this.channel.assertExchange(queue.exchange.name, queue.exchange.type)
            await this.channel.bindQueue(queue.name, queue.exchange.name, queue.pattern)
        }
    }

    async consume<T>( queue: AMQPQueue, callback: (entry: T) => Promise<void> ) {
        await this.channel.consume(queue.name, async (message) => {
            const content = await JSON.parse(message.content.toString()) 
            await callback(content)
            this.channel.ack(message)
        })
    }

}