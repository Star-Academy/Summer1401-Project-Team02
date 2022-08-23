import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {FileModal} from '../../models/file.modal';
import {API_UPLOAD_FILE} from '../../utils/api.utils';

@Injectable({
    providedIn: 'root',
})
export class DatasetService {
    public constructor(private apiService: ApiService) {}

    // public async uploadFile(file: FormData): Promise<boolean> {
    //     const response = await this.apiService.postRequest<FileModal>({
    //         url: API_UPLOAD_FILE,
    //         body: file,
    //         init: {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryTHZKhVaSTpyA3cbU',
    //             },
    //         },
    //     });
    //     if (!response) return false;
    //
    //     return true;
    // }
}
