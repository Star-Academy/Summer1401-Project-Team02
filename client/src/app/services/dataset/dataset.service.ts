import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {FileModal} from '../../models/file.modal';
import {API_DELETE_TABLE, API_GET_TABLES, API_SEND_DESTINATION_NAME, API_UPLOAD_FILE} from '../../utils/api.utils';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root',
})
export class DatasetService {
    public tables: any | null = null;
    public constructor(private apiService: ApiService, private msg: NzMessageService) {}

    public async sendDestination(file: FileModal): Promise<FileModal | null> {
        const response = await this.apiService.postRequest<FileModal>({
            url: API_SEND_DESTINATION_NAME,
            body: JSON.stringify(file.tableName),
            init: {
                headers: {
                    'Content-Type': 'text/json',
                },
            },
        });
        if (response) return JSON.parse(response);
        else return null;
    }

    public async deleteTable(file: string): Promise<FileModal | null> {
        const response = await this.apiService.postRequest<string>({
            url: API_DELETE_TABLE,
            body: JSON.stringify(file),
            init: {
                headers: {
                    'Content-Type': 'text/json',
                },
            },
        });
        if (response) {
            this.msg.create('success', 'Delete successful');
            return JSON.parse(response);
        } else return null;
    }

    public async getTables(): Promise<void> {
        const response = await this.apiService.getRequest<string>({url: API_GET_TABLES});

        if (response) this.tables = JSON.parse(response);
    }
}
