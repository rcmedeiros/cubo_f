import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base_service';
import { Data } from './types/data';

export class DataService extends BaseService {
  constructor(http: HttpClient, url: string, version: string) {
    super(http, url, version, 'Data');
  }

  public async postData(firstName: string, lastName: string, participation: number): Promise<void> {
    await this.post('', { firstName, lastName, participation });
  }

  public async getData(): Promise<Array<Data>> {
    return this.get<Array<Data>>('');
  }
}
