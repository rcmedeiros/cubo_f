import { Component, OnInit } from '@angular/core';

import { CuboApi } from '@app/services/cubo';
import { Data } from '../services/cubo/types/data';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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

  public chartLabels: Label[] = [];
  public chartData: MultiDataSet = [[]];
  public chartType: ChartType = 'doughnut';

  // Component's random color generator is broken. @see https://github.com/valor-software/ng2-charts/issues/251
  public colors: any[] = [
    {
      backgroundColor: [
        '#2C96DD',
        '#00BB9B',
        '#9C55B8',
        '#B2B4B4',
        '#E94B35',
        '#b8436d',
        '#00d9f9',
        '#a4c73c',
        '#a4add3',
        '#b7c0d9',
        '#d0a12d',
        '#ad519d',
        '#99bcba',
        '#e3f42f',
        '#7551c3',
        '#f88d05',
        '#67f703',
        '#3c95ff',
        '#2f18ae',
        '#5fb36e',
        '#5eab46',
        '#c2338c',
        '#cf0c97',
        '#94487e',
        '#53fe54',
        '#4f494d',
        '#17cbf9',
        '#5d21d8',
        '#80638a',
        '#5de104',
        '#dc8d81',
        '#77f398',
        '#282c1e',
        '#d33ff0',
        '#a06027',
        '#7eed1d',
        '#e71913',
        '#587796',
        '#9b0e7a',
        '#9405f2',
        '#ae5911',
        '#983660',
        '#e95160',
        '#47dd50',
        '#c48f61',
        '#003264',
        '#285d5e',
        '#959eeb',
        '#7d3039',
        '#3bfbab',
        '#bc00e2',
      ],
    },
  ];

  constructor(private cuboApi: CuboApi) {}

  async ngOnInit() {
    this.isLoading = true;
    await this.refresh();
    this.isLoading = false;
  }

  public async send() {
    if (this.valid()) {
      try {
        await this.cuboApi.data.postData(this.firstName, this.lastName, this.participation);
        await this.refresh();
      } catch (e) {
        this.errorMessage = e.status === 400 ? e.error.error : 'Connection failed';
        setTimeout(() => {
          this.errorMessage = '';
        }, 7000);
      }
    }
  }

  private async refresh() {
    this.firstName = undefined;
    this.lastName = undefined;
    this.participation = undefined;
    this.data = await this.cuboApi.data.getData();

    this.chartLabels = [];
    this.chartData = [[]];
    this.data.forEach((item: Data) => {
      this.chartData[0].push(item.participation);
      this.chartLabels.push(`${item.firstName} ${item.lastName}`);
    });
    console.log(this.chartLabels);
    console.log(this.chartData);
  }

  private valid(): boolean {
    this.firstNameInvalid = !this.firstName;
    this.lastNameInvalid = !this.lastName;
    this.participationInvalid = this.participation === undefined;
    return !(this.firstNameInvalid || this.lastNameInvalid || this.participationInvalid);
  }
}
