import { Injectable } from '@angular/core';
import { DataService } from './data-service';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '@env/environment';

@Injectable()
export class CuboApi {
  public data: DataService;

  constructor(private http: HttpClient, private httpClient: HttpClient) {
    this.data = new DataService(http, env.cubo_b.url, env.cubo_b.api);
  }
}
