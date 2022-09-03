import {Component} from '@angular/core';
import {FileModal} from '../../models/file.modal';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent {
    public file: FileModal = {
        tableId: '',
        tableName: '',
    };
    public submitForm(): void {}
}
