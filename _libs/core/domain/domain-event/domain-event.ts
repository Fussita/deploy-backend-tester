
export abstract class DomainEvent {
    private ocurredOn: Date
    //private id: string
    
    constructor () { 
        this.ocurredOn = new Date() 
    }

    get OcurredOn() {
        return this.ocurredOn
    }

    get eventName() {
        return this.constructor.name
    }

}
