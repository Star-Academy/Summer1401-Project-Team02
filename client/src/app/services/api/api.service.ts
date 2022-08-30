import {Injectable} from '@angular/core';
import {GetRequestOptions, PostRequestOptions, RequestOptions} from '../../models/request-option.model';
import {DEFAULT_POST_REQUEST_INIT} from '../../utils/api.utils';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private static generatePostRequestInit(options: PostRequestOptions): RequestInit {
        return {
            ...DEFAULT_POST_REQUEST_INIT,
            body: options.body,
            ...(options.init || {}),
        };
    }

    public async getRequest<T>(options: GetRequestOptions): Promise<string | null> {
        return await this.fetchRequest<T>(options, options.init);
    }

    public async postRequest<T>(options: PostRequestOptions): Promise<string | null> {
        const init = ApiService.generatePostRequestInit(options);
        return await this.fetchRequest<T>(options, init);
    }

    private async fetchRequest<T>(options: RequestOptions, init?: RequestInit): Promise<string | null> {
        const {url, showError = true} = options;

        const response = await fetch(url, init);
        const data = await response.text();

        if (response.ok) return data;

        return null;
    }
}
