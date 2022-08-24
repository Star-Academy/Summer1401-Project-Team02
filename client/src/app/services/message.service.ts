import {Injectable} from '@angular/core';
import {MessageComponent} from '../components/message/message.component';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    public messageComponent!: MessageComponent;
    public initComponent(messageComponent: MessageComponent): void {
        this.messageComponent = messageComponent;
    }
    public show(message: string): any {
        this.messageComponent.createMessage(message);
    }
}
