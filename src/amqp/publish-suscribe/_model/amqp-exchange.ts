
export interface AMQPExchange {
    name: string
    type: string
    //durable?: boolean // true: permite que no se borre el exchange al reiniciar
    //persistence?: boolean // true: persisten al publicar mensajes
}