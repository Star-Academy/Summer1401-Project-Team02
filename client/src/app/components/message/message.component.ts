import {Component} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {MessageService} from '../../services/message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
    public constructor(private message: NzMessageService, public messageService: MessageService) {
        this.messageService.initComponent(this);
    }

    public createMessage(type: string): void {
        this.message.create(type, type);
    }
}
