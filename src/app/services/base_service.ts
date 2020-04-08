import { HttpClient } from '@angular/common/http';

export class BaseService {

    private path: string;

    constructor(private http: HttpClient, url: string, version: string, service: string) {
        this.path = `${url}/${version}/${service}/`;
    }

    protected get<T>(method: string, params?: { [index: string]: any }): Promise<T> {
        return this.http.get<T>(this.path + method, { params }).toPromise<T>();
    }

    protected post<T>(method: string, params?: { [index: string]: any }): Promise<T> {
        return this.http.post<T>(this.path + method, params).toPromise<T>();
    }
}
