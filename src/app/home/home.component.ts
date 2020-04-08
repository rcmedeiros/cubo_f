import { Component, OnInit } from '@angular/core';

import { CuboApi } from '@app/services/cubo';
import { Data } from '../services/cubo/types/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public quote: string | undefined;
  public isLoading = false;
  public firstName: string;
  public lastName: string;
  public participation: number;
  public firstNameInvalid = false;
  public lastNameInvalid = false;
  public participationInvalid = false;
  public errorMessage = '';
  public data: Array<Data> = [];

  constructor(private cuboApi: CuboApi) { }

  ngOnInit() {
    this.isLoading = true;
    this.isLoading = false;
  }

  public async send() {
    if (this.valid()) {
      try {
        await this.cuboApi.data.postData(this.firstName, this.lastName, this.participation);
        this.data = await this.cuboApi.data.getData();

      } catch (e) {
        this.errorMessage = e.status === 400 ? e.error.error : 'Connection failed';
        setTimeout(() => {
          this.errorMessage = '';
        }, 7000);
      }
    }
  }

  private valid(): boolean {
    this.firstNameInvalid = !this.firstName;
    this.lastNameInvalid = !this.lastName;
    this.participationInvalid = this.participation === undefined;
    return !(this.firstNameInvalid || this.lastNameInvalid || this.participationInvalid)
  }

}
