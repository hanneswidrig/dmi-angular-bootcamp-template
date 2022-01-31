import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { WeatherSummary } from './api.service.types';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private readonly httpClient: HttpClient) {}

    getWeatherSummary(): Observable<WeatherSummary[]> {
        return this.httpClient.get<WeatherSummary[]>('http://localhost:3000/summary').pipe(delay(0));
    }
}
