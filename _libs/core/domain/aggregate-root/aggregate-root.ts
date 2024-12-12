import { DomainEvent } from "../domain-event/domain-event"
import { Entity } from "../domain-object/entity.interface";
import { IValueObject } from "../value-object/value-object.interface"

export abstract class AggregateRoot<T extends IValueObject<T>> extends Entity<T> {
    protected events: DomainEvent[] = []

    protected constructor(id: T) {
        super(id);
    }

    protected onEvent(event: DomainEvent): void {
        this.applyEvent(event)
        this.ensureValidState()
        this.events.push(event)
    }
    
    protected abstract applyEvent(event: DomainEvent): void

    protected abstract ensureValidState(): void

    public pullEvents(): DomainEvent[] {
        const events = this.events
        this.events = []
        return events
    }
    
}