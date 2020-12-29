import { Component, OnInit, Inject, VERSION } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { FetchdataService, WeatherForecast } from "../fetchdata.service";

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];
  valueWithAsync:number
  constructor( @Inject('BASE_URL') baseUrl: string,
    private fechdataService: FetchdataService) {}

    name = 'Angular ' + VERSION.major;
    time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
  ngOnInit() {
    this.getValueWithAsync();
  }

  async getValueWithAsync() {
    this.valueWithAsync = <number>await this.resolveAfter2Seconds(20);
    //console.log(`async result: ${thi}`);
  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }
  // getWeatherForecasts() {
  //   this.fechdataService.getWeatherForecasts().subscribe(
  //     (data: WeatherForecast[]) => {
  //       console.log('found WeatherForecast' + data);
  //       this.forecasts = data;
  //     },
  //     error => {
  //       console.log('could not get WeatherForecast', error);
  //     }
  //   );
  // }
}
